import Board from './Board';

import { cls } from './utils/utilities'
import { Rerenderable } from './utils/Rerender'

const board = new Board();
console.log(board);

export default function Game() {
  return <div className={cls('game')}>
    <Rerenderable el={
      board.render.bind(board)
    } />
  </div>;
}