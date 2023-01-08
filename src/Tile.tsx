import { Resource, Building } from './utils/enums'
import { cls } from './utils/utilities'
import TileImage from './TileImage'
import board from './Board'
import rerender from './utils/Rerender';

export default class Tile {

  constructor(readonly resource: Resource, readonly number: number) { }

  get neighboringEdges() {
    return board.edges.flat().filter(edge => edge.neighboringTiles.includes(this));
  }

  get neighboringCorners() {
    return board.corners.flat().filter(corner => corner.neighboringTiles.includes(this));
  }

  giveResources() {
    if (this.resource !== Resource.Desert)
      for (const corner of this.neighboringCorners)
        if (corner.hasBuilding && corner.owner) {
          corner.owner.resources[this.resource]++;
          if (corner.building === Building.Town)
            corner.owner.resources[this.resource]++;
        }
    rerender()
  }

  render() {
    return <div className={cls('tile')} >
      <TileImage resource={this.resource} />
      {!!this.number && <div className={cls('tileNumber', { marked: Math.abs(this.number - 7) === 1 })}>{this.number}</div>}
    </div>
  }
}
