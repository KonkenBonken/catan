import Board from './Board';

import { cls } from './utils/utilities'

const board = new Board();
console.log(board);

export default function Game() {
  return <div className={cls('game')}>
    {board.render()}
  </div>;
}