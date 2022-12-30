import shuffle from 'shuffle-list'

import scss from './index.module.scss'

import Tile from './Tile'
import { Numbers, TileResources, TileWidths } from './BoardData'

export default class Board {
  tiles: Tile[] = Object.seal(
    shuffle(TileResources.map((resource, i) => new Tile(resource, Numbers[i]))),
  )

  render() {
    return (<div className={scss.board}>{
      TileWidths.map(([start, width], rowIndex) =>
        <div key={rowIndex} className={scss.tileRow}>
          {
            this.tiles.slice(start, start + width).map(tile => tile.render())
          }
        </div>
      )
    }</div >)
  }
}
