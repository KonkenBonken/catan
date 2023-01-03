import { Player } from './utils/enums'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'
import board from './Board';

export default class Edge {
  owner: Player | null = null

  get hasRoad() {
    return this.owner !== null;
  }

  get neighboringEdges() {
    const myRow = board.edges.findIndex(row => row.includes(this)),
      myCol = board.edges[myRow].findIndex(row => row === this),
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