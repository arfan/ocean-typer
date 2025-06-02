import React, { useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import StartScreen from './StartScreen';
import GameOverScreen from './GameOverScreen';
import PauseScreen from './PauseScreen';
import GameplayScreen from './GameplayScreen';
import CongratulationsScreen from './CongratulationsScreen';

const Game: React.FC = () => {
  const { gameState } = useGame();
  const containerRef = useRef<HTMLDivElement>(null);

  // Set focus on game container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, [gameState]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen overflow-hidden focus:outline-none"
      tabIndex={0}
    >
      {gameState === 'start' && <StartScreen />}
      {gameState === 'playing' && <GameplayScreen />}
      {gameState === 'paused' && <PauseScreen />}
      {gameState === 'gameOver' && <GameOverScreen />}
      {gameState === 'completed' && <CongratulationsScreen />}
    </div>
  );
};

export default Game;