import React from 'react';
import { useGame } from '../context/GameContext';
import { Pause, Play } from 'lucide-react';

const PauseScreen: React.FC = () => {
  const { resumeGame, gameOver } = useGame();

  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-blue-900/90 rounded-lg p-8 max-w-md w-full text-center">
        <Pause className="w-16 h-16 mx-auto mb-4 text-blue-200" />
        <h2 className="text-3xl font-bold text-white mb-6">Game Paused</h2>
        
        <div className="space-y-4">
          <button
            onClick={resumeGame}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center justify-center"
          >
            <Play className="w-5 h-5 mr-2" />
            Resume Game
          </button>
          
          <button
            onClick={gameOver}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
          >
            Quit Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default PauseScreen;