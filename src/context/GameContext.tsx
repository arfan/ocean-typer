import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { wordLists } from '../data/wordLists';
import { useSound } from './SoundContext';

type GameState = 'start' | 'playing' | 'paused' | 'gameOver' | 'completed';

interface Enemy {
  id: string;
  word: string;
  x: number;
  y: number;
  speed: number;
  typed: string;
  isBoss?: boolean;
}

interface Projectile {
  id: string;
  x: number;
  y: number;
  speed: number;
  word: string;
  typed: string;
}

interface GameContextType {
  gameState: GameState;
  score: number;
  level: number;
  lives: number;
  enemies: Enemy[];
  currentInput: string;
  projectiles: Projectile[];
  isBossFight: boolean;
  bossHealth: number;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  handleKeyPress: (key: string) => void;
  setCurrentInput: (input: string) => void;
  enemiesKilled: number;
}

const initialContext: GameContextType = {
  gameState: 'start',
  score: 0,
  level: 1,
  lives: 3,
  enemies: [],
  currentInput: '',
  projectiles: [],
  isBossFight: false,
  bossHealth: 5, //for testing set to 1
  startGame: () => {},
  pauseGame: () => {},
  resumeGame: () => {},
  gameOver: () => {},
  handleKeyPress: () => {},
  setCurrentInput: () => {},
  enemiesKilled: 0,
};

const GameContext = createContext<GameContextType>(initialContext);

export const useGame = () => useContext(GameContext);

const BOSS_MAX_HEALTH = 5; // Boss requires 5 hits to defeat, set to 1 for testing

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    playTyping,
    playEnemyKilled,
    playRocketKilled,
    playLevelComplete,
    playBossMusic,
    stopBossMusic,
    playBackgroundMusic,
    stopBackgroundMusic,
    playHit,
  } = useSound();

  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [lastEnemyTime, setLastEnemyTime] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [isBossFight, setIsBossFight] = useState(false);
  const [bossHealth, setBossHealth] = useState(BOSS_MAX_HEALTH);
  const [lastProjectileTime, setLastProjectileTime] = useState(0);
  const [enemiesKilled, setEnemiesKilled] = useState(0);

  useEffect(() => {
    if (isBossFight) {
      stopBackgroundMusic(); // Stop background music in boss mode
      playBossMusic();
    } else if (gameState === 'playing') {
      stopBossMusic(); // Stop boss music in level mode
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
      stopBossMusic();
    }
  }, [isBossFight, gameState, playBossMusic, playBackgroundMusic, stopBackgroundMusic, stopBossMusic]);

  useEffect(() => {
    let frameId: number;
    let lastTimestamp = 0;

    const gameLoop = (timestamp: number) => {
      if (gameState !== 'playing') return;

      const deltaTime = lastTimestamp ? (timestamp - lastTimestamp) / 1000 : 0;
      lastTimestamp = timestamp;
      
      setGameTime(prevTime => prevTime + deltaTime);

      setEnemies(prevEnemies => {
        return prevEnemies.map(enemy => {
          const newX = enemy.x - enemy.speed * deltaTime;
          
          if (newX < 0) {
            playHit(); // Play hit sound when enemy reaches left
            setLives(prevLives => {
              const newLives = prevLives - 1;
              if (newLives <= 0) {
                setGameState('gameOver');
              }
              return newLives;
            });
            return { ...enemy, x: -100 };
          }
          
          return { ...enemy, x: newX };
        }).filter(enemy => enemy.x > -50);
      });

      setProjectiles(prevProjectiles => {
        return prevProjectiles
          .map(projectile => ({
            ...projectile,
            x: projectile.x - projectile.speed * deltaTime,
          }))
          .filter(projectile => projectile.x > 0);
      });

      if (isBossFight && gameTime - lastProjectileTime > 2) {
        const boss = enemies.find(e => e.isBoss);
        if (boss) {
          const word = getRandomWord();
          setProjectiles(prev => [
            ...prev,
            {
              id: Date.now().toString(),
              x: boss.x,
              y: boss.y,
              speed: 25,
              word,
              typed: '',
            },
          ]);
          setLastProjectileTime(gameTime);
        }
      }

      setProjectiles(prev => {
        const hitProjectiles = prev.filter(p => p.x < 15);
        if (hitProjectiles.length > 0) {
          if (hitProjectiles.length > 0) playHit(); // Play hit sound when projectile reaches left
          setLives(prevLives => {
            const newLives = prevLives - hitProjectiles.length;
            if (newLives <= 0) {
              setGameState('gameOver');
            }
            return newLives;
          });
        }
        return prev.filter(p => p.x >= 15);
      });

      if (!isBossFight && enemiesKilled >= 10) {
        spawnBoss();
        setIsBossFight(true);
        setBossHealth(BOSS_MAX_HEALTH);
      }

      if (!isBossFight) {
        const spawnInterval = Math.max(4 - level * 0.15, 1.5);
        if (gameTime - lastEnemyTime > spawnInterval) {
          spawnEnemy();
          setLastEnemyTime(gameTime);
        }
      }

      frameId = requestAnimationFrame(gameLoop);
    };

    if (gameState === 'playing') {
      frameId = requestAnimationFrame(gameLoop);
    }

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [gameState, level, lastEnemyTime, gameTime, isBossFight, lastProjectileTime, enemiesKilled]);

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setLives(3);
    setEnemies([]);
    setCurrentInput('');
    setLastEnemyTime(0);
    setGameTime(0);
    setProjectiles([]);
    setIsBossFight(false);
    setBossHealth(BOSS_MAX_HEALTH);
    setEnemiesKilled(0);
  };

  const getRandomWord = useCallback(() => {
    const difficulty = Math.min(Math.floor(level / 3), 4);
    const wordList = wordLists[difficulty];
    return wordList[Math.floor(Math.random() * wordList.length)];
  }, [level]);

  const spawnBoss = useCallback(() => {
    setEnemies([{
      id: 'boss',
      word: '',
      x: 80,
      y: 50,
      speed: 0,
      typed: '',
      isBoss: true,
    }]);
  }, []);

  const spawnEnemy = useCallback(() => {
    if (isBossFight) return;

    const id = Date.now().toString();
    const word = getRandomWord();
    const y = Math.random() * 70 + 15;
    const baseSpeed = 15;
    const speedIncrease = 3;
    const speed = baseSpeed + level * speedIncrease;

    setEnemies(prevEnemies => [
      ...prevEnemies,
      {
        id,
        word,
        x: 100,
        y,
        speed,
        typed: '',
      },
    ]);
  }, [getRandomWord, level, isBossFight]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing') return;
    
    playTyping();

    const projectileIndex = projectiles.findIndex(projectile => {
      const nextChar = projectile.word[projectile.typed.length];
      return nextChar === key && projectile.word.startsWith(projectile.typed + key);
    });

    if (projectileIndex !== -1) {
      setProjectiles(prevProjectiles => {
        const updatedProjectiles = [...prevProjectiles];
        const projectile = updatedProjectiles[projectileIndex];
        const newTyped = projectile.typed + key;
        
        if (newTyped === projectile.word) {
          playRocketKilled();
          setBossHealth(prev => {
            const newHealth = prev - 1;
            if (newHealth <= 0) {
              stopBossMusic(); // Stop boss music when boss is defeated
              if (level === 5) {
                setGameState('completed');
              } else {
                setIsBossFight(false);
                setEnemiesKilled(0);
                setEnemies([]); // Clear all enemies including boss
                setProjectiles([]); // Clear all projectiles
                setBossHealth(BOSS_MAX_HEALTH);
                playLevelComplete();
                setLevel(level+1)
                // setTimeout(() => {
                //   setLevel(lvl => lvl + 1);
                // }, 0);
              }
              return BOSS_MAX_HEALTH;
            }
            return newHealth;
          });
          updatedProjectiles.splice(projectileIndex, 1);
          setCurrentInput('');
        } else {
          updatedProjectiles[projectileIndex] = {
            ...projectile,
            typed: newTyped,
          };
          setCurrentInput(newTyped);
        }
        
        return updatedProjectiles;
      });
      return;
    }

    const enemyIndex = enemies.findIndex(enemy => {
      if (enemy.isBoss) return false;
      const nextChar = enemy.word[enemy.typed.length];
      return nextChar === key && enemy.word.startsWith(enemy.typed + key);
    });

    if (enemyIndex !== -1) {
      setEnemies(prevEnemies => {
        const updatedEnemies = [...prevEnemies];
        const enemy = updatedEnemies[enemyIndex];
        const newTyped = enemy.typed + key;
        
        if (newTyped === enemy.word) {
          playEnemyKilled();
          const points = enemy.word.length * 10 * level;
          setScore(prevScore => prevScore + points);
          setEnemiesKilled(prev => prev + 1);
          updatedEnemies.splice(enemyIndex, 1);
          setCurrentInput('');
        } else {
          updatedEnemies[enemyIndex] = {
            ...enemy,
            typed: newTyped,
          };
          setCurrentInput(newTyped);
        }
        
        return updatedEnemies;
      });
    }
  }, [enemies, gameState, level, projectiles, playTyping, playEnemyKilled, playRocketKilled, playLevelComplete, stopBossMusic]);

  const startGame = useCallback(() => {
    resetGame();
    setGameState('playing');
  }, []);

  const pauseGame = useCallback(() => {
    setGameState('paused');
  }, []);

  const resumeGame = useCallback(() => {
    setGameState('playing');
  }, []);

  const gameOver = useCallback(() => {
    setGameState('gameOver');
  }, []);

  const contextValue = {
    gameState,
    score,
    level,
    lives,
    enemies,
    currentInput,
    projectiles,
    isBossFight,
    bossHealth,
    startGame,
    pauseGame,
    resumeGame,
    gameOver,
    handleKeyPress,
    setCurrentInput,
    enemiesKilled,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};