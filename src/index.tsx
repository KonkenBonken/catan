import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import game from './Game';

// @ts-expect-error
window.game = game;
console.log(game);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    {game.render()}
  </StrictMode>
);

game.startGame();