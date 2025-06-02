import React from 'react';
import { useGame } from '../context/GameContext';
import { Fish, Keyboard } from 'lucide-react';

const StartScreen: React.FC = () => {
  const { startGame } = useGame();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-900">
      {/* Animated bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/20 animate-float"
            style={{
              width: `${Math.random() * 30 + 10}px`,
              height: `${Math.random() * 30 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100 + 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="text-center max-w-3xl px-4 relative z-10">
        <div className="flex justify-center mb-6">
          <Fish className="text-blue-200 w-20 h-20 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Ocean <span className="text-blue-200">Typer</span>
        </h1>
        <h2 className="text-2xl text-blue-100 mb-8">
          Type fast to survive the deep!
        </h2>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 text-blue-50">
          <h3 className="text-xl font-semibold mb-4 flex items-center justify-center">
            <Keyboard className="mr-2 h-5 w-5" />
            How to Play
          </h3>
          <ul className="text-left space-y-2">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Type the words attached to sea creatures before they reach you</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Each successful word earns points based on length and difficulty</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>If a creature reaches you, you lose a life</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>The game gets faster and words become harder as you progress</span>
            </li>
          </ul>
        </div>
        
        <button
          onClick={startGame}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default StartScreen;