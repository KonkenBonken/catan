import { cls } from './utils/utilities'
import { Rerenderable } from './utils/Rerender'
import board from './Board';
import { Players, nextPlayer, getCurrentPlayer } from './Player';
import Roll, { Dice } from './Dice';
import { GameState } from './utils/enums';

export default new (class Game {
  readonly board = board
  readonly players = Players
  state = GameState.Pre

  get currentPlayer() {
    return getCurrentPlayer();
  }

  tilesByNumber(num: number) {
    return this.board.tiles.flat().filter(tile => tile.number === num)
  }

  async startGame() {
    this.state = GameState.Main;
    while (Object.values(Players).every(player => player.points < 10)) {
      await this.nextTurn();
      nextPlayer();
    }
    console.log(Object.values(Players).find(player => player.points >= 10), 'Won!');
    this.state = GameState.Post;
  }

  async nextTurn() {
    const rolledNumber = await Roll();

    if (rolledNumber === 7) {
      console.warn('Rolled 7')
      return this.nextTurn();
    }

    for (const tile of this.tilesByNumber(rolledNumber))
      tile.giveResources()
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