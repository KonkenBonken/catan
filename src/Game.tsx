import { cls } from './utils/utilities'
import { Rerenderable } from './utils/Rerender'
import board from './Board';
import { Players, nextPlayer, getCurrentPlayer } from './Player';
import Roll, { Dice } from './Dice';
import { GameState } from './utils/enums';
import Corner from './Corner';
import Edge from './Edge';
import StatusBar, { setStatus } from './StatusBar';

export default new (class Game {
  readonly board = board
  readonly players = Players

  state = GameState.Pre
  allowBuild: typeof Corner | typeof Edge | null = null

  get currentPlayer() {
    return getCurrentPlayer();
  }

  tilesByNumber(num: number) {
    return this.board.tiles.flat().filter(tile => tile.number === num)
  }

  async startGame() {
    await this.preGame();

    this.state = GameState.Main;
    while (Players.every(player => player.points < 10)) {
      setStatus(this.currentPlayer, "'s turn");
      await this.nextTurn();
      nextPlayer();
    }
    console.log(Players.find(player => player.points >= 10), 'Won!');
    this.state = GameState.Post;
  }

  async nextTurn(instant = false) {
    const rolledNumber = await Roll(instant);

    if (rolledNumber === 7) {
      console.warn('Rolled 7')
      return this.nextTurn();
    }

    for (const tile of this.tilesByNumber(rolledNumber))
      tile.giveResources()
  }

  async preGame() {
    for (const _ of Players) {
      for (let i = 0; i < 2; i++) {
        this.allowBuild = Corner;
        setStatus(this.currentPlayer, ', build a house');
        await this.currentPlayer.nextBuilding;
        this.allowBuild = Edge;
        setStatus(this.currentPlayer, ', build a road');
        await this.currentPlayer.nextRoad;
      }
      nextPlayer();
    }
    this.allowBuild = null;
  }

  render() {
    return <div className={cls('game')}>
      <Rerenderable el={() => <>
        {board.render()}
        <div className={cls('players')}>
          {Players.map(player => player.render())}
        </div>
      </>} />
      <Dice />
      <StatusBar />
    </div>;
  }
})()