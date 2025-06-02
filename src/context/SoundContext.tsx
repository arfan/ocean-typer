import React, { createContext, useContext, useEffect, useRef } from 'react';
import typingSound from "../sounds/typing.mp3";
import enemyKilledSound from "../sounds/enemy-killed.mp3";
import rocketKilledSound from "../sounds/rocket-killed.mp3";
import levelCompleteSound from "../sounds/level-complete.mp3";
import bossMusicSound from "../sounds/boss-music.mp3";
import backgroundMusicSound from "../sounds/background-music.mp3";

interface SoundContextType {
  playTyping: () => void;
  playEnemyKilled: () => void;
  playRocketKilled: () => void;
  playLevelComplete: () => void;
  playBossMusic: () => void;
  stopBossMusic: () => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playHit: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playTyping: () => {},
  playEnemyKilled: () => {},
  playRocketKilled: () => {},
  playLevelComplete: () => {},
  playBossMusic: () => {},
  stopBossMusic: () => {},
  playBackgroundMusic: () => {},
  stopBackgroundMusic: () => {},
  playHit: () => {},
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const typingSoundRef = useRef<HTMLAudioElement | null>(null);
  const enemyKilledSoundRef = useRef<HTMLAudioElement | null>(null);
  const rocketKilledSoundRef = useRef<HTMLAudioElement | null>(null);
  const levelCompleteSoundRef = useRef<HTMLAudioElement | null>(null);
  const bossMusicSoundRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements with actual sound files
    typingSoundRef.current = new Audio(typingSound);
    enemyKilledSoundRef.current = new Audio(enemyKilledSound);
    rocketKilledSoundRef.current = new Audio(rocketKilledSound);
    levelCompleteSoundRef.current = new Audio(levelCompleteSound);
    bossMusicSoundRef.current = new Audio(bossMusicSound);
    backgroundMusicSoundRef.current = new Audio(backgroundMusicSound);

    // Configure background music
    if (backgroundMusicSoundRef.current) {
      backgroundMusicSoundRef.current.loop = true;
      backgroundMusicSoundRef.current.volume = 0.3;
    }

    // Configure boss music
    if (bossMusicSoundRef.current) {
      bossMusicSoundRef.current.loop = true;
      bossMusicSoundRef.current.volume = 0.5;
    }

    // Cleanup
    return () => {
      [
        typingSoundRef.current,
        enemyKilledSoundRef.current,
        rocketKilledSoundRef.current,
        levelCompleteSoundRef.current,
        bossMusicSoundRef.current,
        backgroundMusicSoundRef.current,
      ].forEach(sound => {
        if (sound) {
          sound.pause();
          sound.currentTime = 0;
        }
      });
    };
  }, []);

  const playTyping = () => {
    if (typingSoundRef.current) {
      typingSoundRef.current.currentTime = 0;
      typingSoundRef.current.play().catch(() => {});
    }
  };

  const playEnemyKilled = () => {
    if (enemyKilledSoundRef.current) {
      enemyKilledSoundRef.current.currentTime = 0;
      enemyKilledSoundRef.current.play().catch(() => {});
    }
  };

  const playRocketKilled = () => {
    if (rocketKilledSoundRef.current) {
      rocketKilledSoundRef.current.currentTime = 0;
      rocketKilledSoundRef.current.play().catch(() => {});
    }
  };

  const playLevelComplete = () => {
    if (levelCompleteSoundRef.current) {
      levelCompleteSoundRef.current.currentTime = 0;
      levelCompleteSoundRef.current.play().catch(() => {});
    }
  };

  const playBossMusic = () => {
    stopBackgroundMusic();
    if (bossMusicSoundRef.current) {
      bossMusicSoundRef.current.play().catch(() => {});
    }
  };

  const stopBossMusic = () => {
    if (bossMusicSoundRef.current) {
      bossMusicSoundRef.current.pause();
      bossMusicSoundRef.current.currentTime = 0;
    }
  };

  const playBackgroundMusic = () => {
    if (backgroundMusicSoundRef.current) {
      backgroundMusicSoundRef.current.play().catch(() => {});
    }
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicSoundRef.current) {
      backgroundMusicSoundRef.current.pause();
      backgroundMusicSoundRef.current.currentTime = 0;
    }
  };

  const playHit = () => {
    if (rocketKilledSoundRef.current) {
      rocketKilledSoundRef.current.currentTime = 0;
      rocketKilledSoundRef.current.play().catch(() => {});
    }
  };

  return (
    <SoundContext.Provider
      value={{
        playTyping,
        playEnemyKilled,
        playRocketKilled,
        playLevelComplete,
        playBossMusic,
        stopBossMusic,
        playBackgroundMusic,
        stopBackgroundMusic,
        playHit,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};