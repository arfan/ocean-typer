import React from 'react';
import { GameProvider } from './context/GameContext';
import { SoundProvider } from './context/SoundContext';
import Game from './components/Game';

function App() {
  return (
    <SoundProvider>
      <GameProvider>
        <Game />
      </GameProvider>
    </SoundProvider>
  );
}

export default App;