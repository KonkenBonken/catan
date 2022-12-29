import shuffle from 'shuffle-list'

import Tile from './Tile'
import { Numbers, TileResources, TileWidths } from './BoardData'

export default class Board {
  tiles: Tile[] = Object.seal(
    shuffle(TileResources.map((resource, i) => new Tile(resource, Numbers[i]))),
  )

  render() {
    return (<>{
      TileWidths.map(([start, width], rowIndex) =>
        <div key={rowIndex} className="tile-row">
          {
            this.tiles.slice(start, start + width - 1).map(tile => tile.render())
          }
        </div>
      )
    }</>)
  }
}
