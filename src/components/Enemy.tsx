import React, { useMemo } from 'react';
import { Fish, Share as Shark, Scale as Whale, Grab as Crab, Skull } from 'lucide-react';

interface EnemyProps {
  enemy: {
    id: string;
    word: string;
    x: number;
    y: number;
    typed: string;
    isBoss?: boolean;
  };
}

const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const EnemyIcon = useMemo(() => {
    if (enemy.isBoss) return Skull;
    if (enemy.word.length > 8) return Shark;
    if (enemy.word.length > 6) return Whale;
    if (enemy.word.length > 4) return Fish;
    return Crab;
  }, [enemy.word, enemy.isBoss]);

  const typedPart = enemy.typed;
  const untypedPart = enemy.word.slice(typedPart.length);

  return (
    <div
      className="absolute flex flex-col items-center transition-transform duration-100"
      style={{
        left: `${enemy.x}%`,
        top: `${enemy.y}%`,
        transform: `scale(${enemy.isBoss ? 2 : 1 + (enemy.word.length > 6 ? 0.5 : 0)})`,
      }}
    >
      <EnemyIcon 
        className={`w-12 h-12 ${
          enemy.isBoss
            ? 'text-red-600'
            : enemy.word.length > 8 
              ? 'text-red-500' 
              : enemy.word.length > 6 
                ? 'text-blue-300' 
                : enemy.word.length > 4 
                  ? 'text-yellow-400' 
                  : 'text-orange-400'
        }`}
        style={{ transform: 'scaleX(-1)' }}
      />
      
      {!enemy.isBoss && (
        <div className="bg-gray-800/70 px-2 py-1 rounded-lg mt-2 text-center whitespace-nowrap">
          <span className="text-green-400 font-semibold text-2xl">{typedPart}</span>
          <span className="text-white font-semibold text-2xl">{untypedPart}</span>
        </div>
      )}
    </div>
  );
};

export default Enemy;