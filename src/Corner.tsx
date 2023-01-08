import { PlayerColors, Building, Resource } from './utils/enums'
import Player, { Players, nextPlayer } from './Player'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'
import board from './Board';
import type Tile from './Tile';
import Buildable from './Buildable'

export default class Corner extends Buildable {
  building: Building | null = null

  get hasBuilding() {
    return this.building !== null;
  }

  get myCoords() {
    const myRow = board.corners.findIndex(row => row.includes(this)),
      myCol = board.corners[myRow].findIndex(row => row === this);
    return [myRow, myCol] as const
  }

  get _neighboringEdges() {
    return board.edges.flat().filter(edge => edge.neighboringCorners.includes(this));
  }

  get _neighboringCorners() {
    return this.neighboringEdges.flatMap(edge => edge.neighboringCorners).filter(corner => corner !== this);
  }

  get _neighboringTiles() {
    const [myRow, myCol] = this.myCoords,
      belowMid = myRow > 5,
      isTop = !(myRow % 2),
      neighbors: Tile[] = [],
      { tiles } = board;

    neighbors.push(
      tiles[Math.floor(myRow / 2)]?.[Math.floor(myCol + (belowMid ? -1 : 0))]
    );

    if (isTop)
      neighbors.push(
        tiles[Math.floor(myRow / 2) - 1]?.[Math.floor(myCol)],
        tiles[Math.floor(myRow / 2) - 1]?.[Math.floor(myCol - 1)]
      )
    else
      neighbors.push(
        tiles[Math.floor(myRow / 2) - 1]?.[Math.floor(myCol + (belowMid ? 0 : -1))],
        tiles[Math.floor(myRow / 2)]?.[Math.floor(myCol + (belowMid ? 0 : -1))]
      );

    return neighbors.filter(tile => tile && tile.resource !== Resource.Desert);
  }

  constructor() {
    super();
    if (Math.random() < .3)
      this.build(nextPlayer(), [Building.House, Building.Town][Math.floor(Math.random() * 2)])
  }

  render() {
    return <div
      onClick={() => this.onClick()}
      className={cls('corner', { hasBuilding: this.hasBuilding, hasTown: this.building === Building.Town }, PlayerColors[this.color ?? -1])}
    >
      {this.building === Building.Town && <>
        <div className={cls('townHouse')} />
        <div className={cls('townHouse')} />
      </>}
    </div>
  }

  private onClick() {
    this.build(
      Players[Math.floor(Math.random() * 4)],
      [Building.House, Building.Town][Math.floor(Math.random() * 2)]
    )
  }

  build(newOwner: Player, newBuilding: Building) {
    if (
      !this.hasBuilding ||
      (this.building === Building.House && this.owner === newOwner)
    ) {
      this.owner = newOwner;
      this.building = newBuilding;
      rerender();
    }
  }
}
