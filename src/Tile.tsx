import { Resource, Building } from './utils/enums'
import { cls } from './utils/utilities'
import Tileset from './Tileset128'
import board from './Board'

export default class Tile {

  constructor(readonly resource: Resource, readonly number: number) { }

  get neighboringEdges() {
    return board.edges.flat().filter(edge => edge.neighboringTiles.includes(this));
  }

  get neighboringCorners() {
    return board.corners.flat().filter(corner => corner.neighboringTiles.includes(this));
  }

  giveResources(): void {
    if (this.resource !== Resource.Desert)
      for (const corner of this.neighboringCorners)
        if (corner.hasBuilding && corner.owner) {
          corner.owner.resources[this.resource]++;
          if (corner.building === Building.Town)
            corner.owner.resources[this.resource]++;
        }
  }

  render() {
    return <div className={cls('tile')} >
      <Tileset resource={this.resource} />
      {!!this.number && <div className={cls('tileNumber', { marked: Math.abs(this.number - 7) === 1 })}>{this.number}</div>}
    </div>
  }
}
