import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';

import Board from './Board';

const board = new Board();
console.log(board);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    {board.render()}
  </StrictMode>
);