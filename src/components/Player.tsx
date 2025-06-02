import React from 'react';
import { Anchor } from 'lucide-react';

const Player: React.FC = () => {
  return (
    <div className="absolute left-10 top-1/2 transform -translate-y-1/2 flex flex-col items-center">
      <div className="relative">
        {/* Diver character */}
        <div className="w-16 h-16 bg-blue-800 rounded-full relative flex items-center justify-center">
          <div className="absolute w-12 h-8 bg-gray-200 rounded-full top-1"></div>
          <div className="absolute w-6 h-2 bg-gray-400 rounded-full top-3 left-5"></div>
          <div className="absolute w-8 h-3 bg-yellow-500 rounded-full top-6"></div>
        </div>
        
        {/* Oxygen bubble animation */}
        <div className="absolute -top-2 left-2">
          <div className="w-2 h-2 bg-white/70 rounded-full animate-float"></div>
        </div>
        <div className="absolute -top-4 left-4">
          <div className="w-3 h-3 bg-white/50 rounded-full animate-float animation-delay-300"></div>
        </div>
      </div>
      
      {/* Anchor line */}
      <div className="w-1 h-40 bg-gradient-to-b from-gray-400 to-gray-500 absolute -z-10"></div>
      <Anchor className="w-8 h-8 text-gray-500 absolute -z-10 bottom-0 transform translate-y-36" />
    </div>
  );
};

export default Player;