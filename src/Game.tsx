import { cls } from './utils/utilities'
import { Rerenderable } from './utils/Rerender'
import board from './Board';
import { Players } from './Player';

export default new (class Game {
  readonly board = board
  readonly players = Players

  tilesByNumber(num: number) {
    return this.board.tiles.flat().filter(tile => tile.number === num)
  }

  render() {
    return <div className={cls('game')}>
      <Rerenderable el={
        board.render.bind(board)
      } />
    </div>;
  }
})()