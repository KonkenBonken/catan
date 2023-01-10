import { Resource, Building } from './utils/enums'
import { cls } from './utils/utilities'
import TileImage from './TileImage'
import board from './Board'
import rerender from './utils/Rerender';

let currentTileId = 0;

export default class Tile {
  private readonly id = 't' + (currentTileId++).toString(36);

  constructor(readonly resource: Resource, readonly number: number) { }

  get neighboringEdges() {
    return board.edges.flat().filter(edge => edge.neighboringTiles.includes(this));
  }

  get neighboringCorners() {
    return board.corners.flat().filter(corner => corner.neighboringTiles.includes(this));
  }

  get tileDiv() {
    return document.querySelector(`.${cls('tile')}#${this.id}`) as HTMLDivElement | undefined;
  }

  giveResources() {
    if (this.resource !== Resource.Desert)
      for (const corner of this.neighboringCorners)
        if (corner.hasBuilding && corner.owner)
          corner.owner.addResource(
            this.resource,
            this.tileDiv,
            corner.building === Building.Town
          );
  }

  render() {
    return <div className={cls('tile')} id={this.id}>
      <TileImage resource={this.resource} />
      {!!this.number && <div className={cls('tileNumber', { marked: Math.abs(this.number - 7) === 1 })}>{this.number}</div>}
    </div>
  }
}
