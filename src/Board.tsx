import shuffle from 'shuffle-list'

import { cls } from './utils/utilities'
import Tile from './Tile'
import { Numbers, TileResources, TileWidths } from './utils/BoardData'

export default class Board {
  tiles: Tile[] = Object.seal(
    shuffle(TileResources.map((resource, i) => new Tile(resource, Numbers[i]))),
  )

  render() {
    return (<div className={cls('board')}>{
      TileWidths.map(([start, width], rowIndex) =>
        <div key={rowIndex} className={cls('tileRow')}>
          {
            this.tiles.slice(start, start + width).map(tile => tile.render())
          }
        </div>
      )
    }</div >)
  }
}
