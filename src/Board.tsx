import shuffle from 'shuffle-list'

import { cls } from './utils/utilities'
import Tile from './Tile'
import Corner from './Corner'
import Edge from './Edge'
import { Numbers, TileResources, TileWidths, Corners, Edges } from './utils/BoardData'

export default new (
  class Board {
    tiles = Object.seal(
      shuffle(TileResources.map((resource, i) => new Tile(resource, Numbers[i]))),
    )

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
            TileWidths.map(([start, width], rowIndex) =>
              <div key={rowIndex} >
                {
                  this.tiles.slice(start, start + width).map(tile => tile.render())
                }
              </div>
            )
          }
        </div>
      </div>
      )
    }
  }
)()