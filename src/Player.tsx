import { PlayerColors } from './utils/enums'
import board from './Board'

export default class Player {

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
