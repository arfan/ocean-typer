import React from 'react';
import { GameProvider } from './context/GameContext';
import { SoundProvider } from './context/SoundContext';
import Game from './components/Game';

function App() {
  return (
    <SoundProvider>
      <GameProvider>
        <Game />
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-colors z-50"
        >
          Built with Bolt.new ⚡
        </a>
      </GameProvider>
    </SoundProvider>
  );
}

export default App;