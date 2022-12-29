import React from 'react';

import Board from './Board';

const board = new Board();
console.log(board);

export default function App() {
  return (
    <div className="board" />
  );
}