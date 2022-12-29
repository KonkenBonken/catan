import shuffle from 'shuffle-list'

import Tile from './Tile'
import { Numbers, TileResources } from './BoardData'

export default class Board {
  tiles: Tile[] = Object.seal(
    shuffle(TileResources.map((resource, i) => new Tile(resource, Numbers[i]))),
  )
}
