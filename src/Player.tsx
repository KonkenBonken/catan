import shuffle from 'shuffle-list'

import { Building, PlayerColors, Resource } from './utils/enums'
import board from './Board'

export default class Player {
  resources: Record<Exclude<Resource, Resource.Desert>, number> = {
    [Resource.Wood]: 0,
    [Resource.Wheat]: 0,
    [Resource.Stone]: 0,
    [Resource.Clay]: 0,
    [Resource.Sheep]: 0
  }

  constructor(readonly color: PlayerColors) { };

  get Corners() {
    return board.corners.flat().filter(corner => corner.owner === this)
  }

  get Edges() {
    return board.edges.flat().filter(edge => edge.owner === this)
  }

  get points() {
    return this.Corners.length + this.Corners.filter(corner => corner.building === Building.Town).length
  }
}

export const Players = new (class Players extends Array<Player> {
  readonly Red = new Player(PlayerColors.Red);
  readonly Yellow = new Player(PlayerColors.Yellow);
  readonly Blue = new Player(PlayerColors.Blue);
  readonly Green = new Player(PlayerColors.Green);

  protected 0 = this.Red;
  protected 1 = this.Yellow;
  protected 2 = this.Blue;
  protected 3 = this.Green;
})()

const turnGenerator = (function* () {
  const players = shuffle(Players);
  let i = 0;
  while (true)
    yield players[i++ % players.length]
})()

let currentPlayer = turnGenerator.next().value;

export function getCurrentPlayer() {
  return currentPlayer;
}

export function nextPlayer() {
  currentPlayer = turnGenerator.next().value;
  return currentPlayer;
}