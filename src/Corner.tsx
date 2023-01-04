import { PlayerColors, Building, Resource } from './utils/enums'
import Player, { Players } from './Player'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'
import board from './Board';
import type Tile from './Tile';

export default class Corner {
  building: Building | null = null
  owner: Player | null = null

  get color() {
    return this.owner?.color;
  }

  get hasBuilding() {
    return this.building !== null;
  }

  get myCoords() {
    const myRow = board.corners.findIndex(row => row.includes(this)),
      myCol = board.corners[myRow].findIndex(row => row === this);
    return [myRow, myCol] as const
  }

  get neighboringEdges() {
    return board.edges.flat().filter(edge => edge.neighboringCorners.includes(this));
  }

  get neighboringCorners() {
    return this.neighboringEdges.flatMap(edge => edge.neighboringCorners).filter(corner => corner !== this);
  }

  get neighboringTiles() {
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
      [Players.Red, Players.Yellow, Players.Blue, Players.Green][Math.floor(Math.random() * 4)],
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
