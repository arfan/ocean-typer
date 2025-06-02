import React from 'react';
import { useGame } from '../context/GameContext';
import Enemy from './Enemy';
import Player from './Player';

const GameArea: React.FC = () => {
  const { enemies, projectiles } = useGame();

  return (
    <div className="relative w-full h-full">
      {/* Player character */}
      <Player />
      
      {/* Enemies */}
      {enemies.map(enemy => (
        <Enemy key={enemy.id} enemy={enemy} />
      ))}

      {/* Boss projectiles */}
      {projectiles.map(projectile => (
        <div
          key={projectile.id}
          className="absolute flex items-center justify-center"
          style={{
            left: `${projectile.x}%`,
            top: `${projectile.y}%`,
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        >
          <div className="w-24 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
            <span className="text-white text-xl font-bold">
              <span className="text-green-200">{projectile.typed}</span>
              <span>{projectile.word.slice(projectile.typed.length)}</span>
            </span>
          </div>
        </div>
      ))}
      
      {/* Seaweed decorations at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 bg-green-800 animate-sway"
            style={{
              left: `${i * 5}%`,
              height: `${Math.random() * 60 + 40}px`,
              width: '20px',
              borderRadius: '10px 10px 0 0',
              animationDelay: `${4}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameArea;