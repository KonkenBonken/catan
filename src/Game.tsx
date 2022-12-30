import Board from './Board';

import scss from './index.module.scss'

const board = new Board();
console.log(board);

export default function Game() {
  return <div className={scss.game}>
    {board.render()}
  </div>;
}