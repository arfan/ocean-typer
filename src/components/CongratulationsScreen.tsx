import React from 'react';
import { useGame } from '../context/GameContext';
import { Trophy, RotateCcw } from 'lucide-react';

const CongratulationsScreen: React.FC = () => {
  const { score, startGame } = useGame();

  return (
    <div className="absolute inset-0 bg-blue-900/95 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-blue-800 to-blue-900 rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
        <h2 className="text-5xl font-bold text-yellow-400 mb-4">Congratulations!</h2>
        <h3 className="text-2xl text-blue-200 mb-6">You've completed the game!</h3>
        
        <div className="flex justify-center mb-8">
          <Trophy className="text-yellow-400 w-24 h-24 animate-bounce" />
        </div>
        
        <div className="bg-blue-800/60 rounded-lg p-6 mb-8">
          <div className="text-blue-200 text-lg mb-2">Final Score</div>
          <div className="text-5xl font-bold text-white mb-6">{score}</div>
          <div className="text-blue-200 text-sm italic">
            Created by <strong>Arfan</strong>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="w-full px-6 py-4 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105"
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Play Again
        </button>
      </div>
    </div>
  );
};

export default CongratulationsScreen;