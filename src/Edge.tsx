import { Player } from './utils/enums'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'
import Corner from './Corner'
import board from './Board'

export default class Edge {
  owner: Player | null = null

  get hasRoad() {
    return this.owner !== null;
  }

  get myCoords() {
    const myRow = board.edges.findIndex(row => row.includes(this)),
      myCol = board.edges[myRow].findIndex(row => row === this);
    return [myRow, myCol] as const

  }

  get neighboringEdges() {
    const [myRow, myCol] = this.myCoords,
      tiltedRow = !(myRow % 2),
      belowMid = myRow > 5,
      isMid = myRow === 5,
      neighbors: Edge[] = [];

    if (tiltedRow) {
      neighbors.push(board.edges[myRow][myCol - 1]);
      neighbors.push(board.edges[myRow][myCol + 1]);

      if (belowMid) {
        neighbors.push(board.edges[myRow - 1]?.[Math.floor((myCol + 1) / 2)]);
        neighbors.push(board.edges[myRow + 1]?.[Math.floor((myCol) / 2)]);
      } else {
        neighbors.push(board.edges[myRow - 1]?.[Math.floor((myCol) / 2)]);
        neighbors.push(board.edges[myRow + 1]?.[Math.floor((myCol + 1) / 2)]);
      }
    } else {
      neighbors.push(board.edges[myRow - 1]?.[Math.floor((myCol) * 2)]);
      neighbors.push(board.edges[myRow + 1]?.[Math.floor((myCol) * 2)]);

      if (isMid) {
        neighbors.push(board.edges[myRow - 1]?.[Math.floor((myCol) * 2 - 1)]);
        neighbors.push(board.edges[myRow + 1]?.[Math.floor((myCol) * 2 - 1)]);
      }
      else if (belowMid) {
        neighbors.push(board.edges[myRow - 1]?.[Math.floor((myCol) * 2 + 1)]);
        neighbors.push(board.edges[myRow + 1]?.[Math.floor((myCol) * 2 - 1)]);
      } else {
        neighbors.push(board.edges[myRow - 1]?.[Math.floor((myCol) * 2 - 1)]);
        neighbors.push(board.edges[myRow + 1]?.[Math.floor((myCol) * 2 + 1)]);
      }
    }
    return neighbors.filter(x => x);
  }

  get neighboringCorners() {
    const [myRow, myCol] = this.myCoords,
      tiltedRow = !(myRow % 2),
      belowMid = myRow > 5,
      neighbors: Corner[] = [];

    if (tiltedRow) {
      if (belowMid) {
        neighbors.push(board.corners[myRow]?.[Math.ceil(myCol / 2)]);
        neighbors.push(board.corners[myRow + 1]?.[Math.ceil((myCol - 1) / 2)]);
      } else {
        neighbors.push(board.corners[myRow]?.[Math.ceil((myCol - 1) / 2)]);
        neighbors.push(board.corners[myRow + 1]?.[Math.ceil(myCol / 2)]);
      }
    } else {
      neighbors.push(board.corners[myRow]?.[myCol]);
      neighbors.push(board.corners[myRow + 1]?.[myCol]);
    }
    return neighbors.filter(x => x);
  }

  render() {
    return <div
      onClick={() => this.onClick()}
      className={cls('edge', { hasRoad: this.hasRoad }, Player[this.owner || -1])}
    />
  }

  private onClick() {
    this.build([Player.Red, Player.Yellow, Player.Blue, Player.Green][Math.floor(Math.random() * 4)])
  }

  build(newOwner: Player) {
    if (!this.hasRoad) {
      this.owner = newOwner;
      rerender();
    }
  }
}