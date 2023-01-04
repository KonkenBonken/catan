import { PlayerColors } from './utils/enums'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'
import Player, { Players } from './Player'
import board from './Board'
import type Corner from './Corner'

export default class Edge {
  owner: Player | null = null
  private memo: {
    neighboringEdges?: Edge[],
    neighboringCorners?: Corner[],
  } = {}

  get color() {
    return this.owner?.color;
  }

  get hasRoad() {
    return this.owner !== null;
  }

  get myCoords() {
    const myRow = board.edges.findIndex(row => row.includes(this)),
      myCol = board.edges[myRow].findIndex(row => row === this);
    return [myRow, myCol] as const

  }

  get neighboringEdges() {
    if (this.memo.neighboringEdges)
      return this.memo.neighboringEdges;

    const [myRow, myCol] = this.myCoords,
      tiltedRow = !(myRow % 2),
      belowMid = myRow > 5,
      isMid = myRow === 5,
      neighbors: Edge[] = [],
      { edges } = board;

    if (tiltedRow)
      neighbors.push(
        edges[myRow][myCol - 1],
        edges[myRow][myCol + 1],
        edges[myRow + (belowMid ? -1 : 1)]?.[Math.floor((myCol + 1) / 2)],
        edges[myRow + (belowMid ? 1 : -1)]?.[Math.floor((myCol) / 2)]
      )
    else {
      neighbors.push(
        edges[myRow - 1]?.[Math.floor((myCol) * 2)],
        edges[myRow + 1]?.[Math.floor((myCol) * 2)]
      );

      if (isMid)
        neighbors.push(
          edges[myRow - 1]?.[Math.floor((myCol) * 2 - 1)],
          edges[myRow + 1]?.[Math.floor((myCol) * 2 - 1)]
        )
      else
        neighbors.push(
          edges[myRow + (belowMid ? -1 : 1)]?.[Math.floor((myCol) * 2 + 1)],
          edges[myRow + (belowMid ? 1 : -1)]?.[Math.floor((myCol) * 2 - 1)]
        );
    }

    for (let i = 0; i < neighbors.length; i++)
      if (neighbors[i] === undefined)
        neighbors.splice(i, 1);

    this.memo.neighboringEdges = neighbors;
    return neighbors;
  }

  get neighboringCorners() {
    if (this.memo.neighboringCorners)
      return this.memo.neighboringCorners;

    const [myRow, myCol] = this.myCoords,
      tiltedRow = !(myRow % 2),
      belowMid = myRow > 5,
      neighbors: Corner[] = [],
      { corners } = board;

    if (tiltedRow)
      neighbors.push(
        corners[myRow + (belowMid ? 0 : 1)]?.[Math.ceil(myCol / 2)],
        corners[myRow + (belowMid ? 1 : 0)]?.[Math.ceil((myCol - 1) / 2)]
      )
    else
      neighbors.push(
        corners[myRow]?.[myCol],
        corners[myRow + 1]?.[myCol]
      );

    for (let i = 0; i < neighbors.length; i++)
      if (neighbors[i] === undefined)
        neighbors.splice(i, 1);

    this.memo.neighboringCorners = neighbors;
    return neighbors;
  }

  render() {
    return <div
      onClick={() => this.onClick()}
      className={cls('edge', { hasRoad: this.hasRoad }, PlayerColors[this.color ?? -1])}
    />
  }

  private onClick() {
    this.build([Players.Red, Players.Yellow, Players.Blue, Players.Green][Math.floor(Math.random() * 4)])
  }

  build(newOwner: Player) {
    if (!this.hasRoad) {
      this.owner = newOwner;
      rerender();
    }
  }
}