import React, { useEffect, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import GameHUD from './GameHUD';
import GameArea from './GameArea';
import { Pause } from 'lucide-react';
import TypeBox from './TypeBox';

const GameplayScreen: React.FC = () => {
  const { pauseGame, handleKeyPress } = useGame();

  // Handle keyboard input
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only process alphabetic keys and space
    if (/^[a-zA-Z ]$/.test(e.key)) {
      handleKeyPress(e.key.toLowerCase());
    }
  }, [handleKeyPress]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 overflow-hidden">
      {/* Animated bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
              animationDuration: `${Math.random() * 8 + 4}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Game pause button */}
      <button
        onClick={pauseGame}
        className="absolute top-4 right-4 z-30 bg-blue-800/50 hover:bg-blue-700 p-2 rounded-full"
      >
        <Pause className="w-6 h-6 text-white" />
      </button>
      
      {/* Game HUD (score, level, lives) */}
      <GameHUD />
      
      {/* Main game area */}
      <GameArea />

      {/* Typing input box */}
      <TypeBox />
    </div>
  );
};

export default GameplayScreen;