import use_Promise from 'use-promise-hook'

import { Resource, Building } from './utils/enums'
import { cls } from './utils/utilities'
import TileImage from './TileImage'
import board from './Board'
import rerender from './utils/Rerender'

export default class Tile {
  private tileDiv: HTMLDivElement | undefined;
  hasRobber: boolean;
  resolveClick?: () => void;

  constructor(readonly resource: Resource, readonly number: number) {
    this.hasRobber = resource === Resource.Desert;
  }

  get neighboringEdges() {
    return board.edges.flat().filter(edge => edge.neighboringTiles.includes(this));
  }

  get neighboringCorners() {
    return board.corners.flat().filter(corner => corner.neighboringTiles.includes(this));
  }

  setRobber(has: boolean) {
    this.hasRobber = has;
    rerender()
  }

  nextClick() {
    let prom: Promise<Tile>;
    [prom, this.resolveClick] = use_Promise(this as Tile);
    rerender();
    return prom;
  }

  giveResources() {
    if (this.resource !== Resource.Desert && !this.hasRobber)
      for (const corner of this.neighboringCorners)
        if (corner.hasBuilding && corner.owner)
          corner.owner.addResource(
            this.resource,
            this.tileDiv,
            corner.building === Building.Town
          );
  }

  render() {
    return <div
      className={cls('tile')}
      ref={div => this.tileDiv = div ?? undefined}
      onClick={this.resolveClick}
    >
      {this.hasRobber && <div className={cls('robber')} />}
      <TileImage resource={this.resource} />
      {!!this.number && <div className={cls('tileNumber', { marked: Math.abs(this.number - 7) === 1 })}>{this.number}</div>}
    </div>
  }
}
