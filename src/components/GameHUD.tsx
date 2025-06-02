import React from 'react';
import { useGame } from '../context/GameContext';
import { Heart } from 'lucide-react';

const ENEMIES_PER_LEVEL = {
  1: 1,
  2: 1,
  3: 1,
  4: 1,
  5: 1
};

const GameHUD: React.FC = () => {
  const { score, level, lives, isBossFight, bossHealth, enemiesKilled } = useGame();
  
  // Calculate progress to next level based on enemies killed
  let progress = 0;
  if (isBossFight) {
    progress = 100;
  } else {
    const total = ENEMIES_PER_LEVEL[level as keyof typeof ENEMIES_PER_LEVEL] || 1;
    progress = Math.min(100, Math.round((enemiesKilled / total) * 100));
  }

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/50 to-transparent">
      <div className="bg-blue-900/60 backdrop-blur-sm rounded-lg px-4 py-2">
        <div className="text-xs text-blue-200 uppercase tracking-wider">Score</div>
        <div className="text-xl font-bold text-white">{score}</div>
      </div>
      
      <div className="bg-blue-900/60 backdrop-blur-sm rounded-lg px-4 py-2">
        <div className="text-xs text-blue-200 uppercase tracking-wider flex justify-between items-center gap-2">
          <span>Level {level}</span>
          {isBossFight ? (
            <span className="text-red-400">BOSS</span>
          ) : (
            <span className="text-blue-300">{progress}%</span>
          )}
        </div>
        <div className="w-32 h-2 bg-blue-950/50 rounded-full overflow-hidden mt-1">
          {isBossFight ? (
            <div 
              className="h-full bg-red-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${bossHealth}%` }}
            />
          ) : (
            <div 
              className="h-full bg-blue-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          )}
        </div>
      </div>
      
      <div className="bg-blue-900/60 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center">
        <div className="flex">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 ${
                i < lives ? 'text-red-500 fill-red-500' : 'text-gray-500'
              } transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHUD;