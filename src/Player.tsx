import { PlayerColors, Resource } from './utils/enums'
import board from './Board'

export default class Player {
  balance: Record<Exclude<Resource, Resource.Desert>, number> = {
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
}

export const Players = {
  Red: new Player(PlayerColors.Red),
  Yellow: new Player(PlayerColors.Yellow),
  Blue: new Player(PlayerColors.Blue),
  Green: new Player(PlayerColors.Green),
}
