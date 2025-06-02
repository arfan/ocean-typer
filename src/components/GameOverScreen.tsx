import React from 'react';
import { useGame } from '../context/GameContext';
import { RotateCcw, Trophy } from 'lucide-react';

const GameOverScreen: React.FC = () => {
  const { score, level, startGame } = useGame();

  return (
    <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-blue-900/90 rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-4xl font-bold text-red-500 mb-2">Game Over</h2>
        
        <div className="flex justify-center mb-6">
          <Trophy className="text-yellow-400 w-20 h-20" />
        </div>
        
        <div className="bg-blue-800/60 rounded-lg p-4 mb-6">
          <div className="mb-4">
            <div className="text-blue-200 text-sm uppercase tracking-wider">Final Score</div>
            <div className="text-4xl font-bold text-white">{score}</div>
          </div>
          
          <div>
            <div className="text-blue-200 text-sm uppercase tracking-wider">Level Reached</div>
            <div className="text-3xl font-bold text-white">{level}</div>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;