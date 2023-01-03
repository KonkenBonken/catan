import board from './Board';

import { cls } from './utils/utilities'
import { Rerenderable } from './utils/Rerender'

console.log(board);

export default function Game() {
  return <div className={cls('game')}>
    <Rerenderable el={
      board.render.bind(board)
    } />
  </div>;
}