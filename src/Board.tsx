import shuffle from 'shuffle-list'

import { cls } from './utils/utilities'
import Tile from './Tile'
import Corner from './Corner'
import Edge from './Edge'
import { TileNumbers, TileResources, Tiles, Corners, Edges } from './utils/BoardData'

export default new (
  class Board {
    tiles: Tile[][] = [];

    corners = Object.seal(
      Corners.map(length =>
        Object.seal(
          Array.from({ length }, () => new Corner())
        )))

    edges = Object.seal(
      Edges.map(length =>
        Object.seal(
          Array.from({ length }, () => new Edge())
        )))

    constructor() {
      const tiles = shuffle(TileResources.map((resource, i) => new Tile(resource, TileNumbers[i])));
      for (const width of Tiles)
        this.tiles.push(tiles.splice(0, width))
    }

    render() {
      return (<div className={cls('board')}>
        <div className={cls('corners')}>
          {
            this.corners.map(cornerRow => <div>
              {cornerRow.map(corner => corner.render())}
            </div>)
          }
        </div>
        <div className={cls('edges')}>
          {
            this.edges.map(edgeRow => <div>
              {edgeRow.map(edge => edge.render())}
            </div>)
          }
        </div>
        <div className={cls('tiles')}>
          {
            this.tiles.map(tileRow => <div>
              {tileRow.map(tile => tile.render())}
            </div>)
          }
        </div>
      </div>
      )
    }
  }
)()