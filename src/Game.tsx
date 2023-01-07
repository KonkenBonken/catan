import { cls } from './utils/utilities'
import { Rerenderable } from './utils/Rerender'
import board from './Board';
import { Players, nextPlayer } from './Player';
import Roll, { Dice } from './Dice';

export default new (class Game {
  readonly board = board
  readonly players = Players
  currentPlayer = nextPlayer()

  tilesByNumber(num: number) {
    return this.board.tiles.flat().filter(tile => tile.number === num)
  }

  async nextTurn() {
    const rolledNumber = await Roll();

    if (rolledNumber === 7) {
      console.warn('Rolled 7')
      return this.nextTurn();
    }

    for (const tile of this.tilesByNumber(rolledNumber))
      tile.giveResources()

    this.currentPlayer = nextPlayer();
  }

  render() {
    return <div className={cls('game')}>
      <Rerenderable el={
        board.render.bind(board)
      } />
      <Dice />
    </div>;
  }
})()