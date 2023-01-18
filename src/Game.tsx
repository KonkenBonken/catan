import { cls } from './utils/utilities'
import { Rerenderable } from './utils/Rerender'
import board from './Board';
import Players from './Player';
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
    return Players.currentPlayer;
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
      Players.nextPlayer();
    }
    console.log(Players.find(player => player.points >= 10), 'Won!');
    this.state = GameState.Post;
  }

  async nextTurn(instant = false) {
    const rolledNumber = await Roll(instant);

    if (rolledNumber === 7)
      return this.rolledSeven();

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
      Players.nextPlayer();
    }
    this.allowBuild = null;
  }

  async rolledSeven() {
    for (const _ of Players) {
      if (this.currentPlayer.resources.length > 7) {
        const throwCount = Math.floor(this.currentPlayer.resources.length / 2);
        setStatus(this.currentPlayer, `, throw away ${throwCount} cards`);
        await this.currentPlayer.throwCards(throwCount);
      }
      Players.nextPlayer();
    }

    setStatus(this.currentPlayer, ', choose where to put the robber');
    const newTile = await this.board.chooseTile(this.board.robbedTile);
    this.board.robbedTile.setRobber(false);
    newTile.setRobber(true);
  }

  render() {
    return <div className={cls('game')}>
      <Rerenderable el={() => <>
        {board.render()}
        <div className={cls('players')}>
          {Players.map(player => player.render(player === this.currentPlayer))}
        </div>
      </>} />
      <Dice />
      <StatusBar />
    </div>;
  }
})()