import scss from './index.module.scss'

import { Resource } from './types/enums'
import Tileset from './Tileset128'

export default class Tile {
  resource: Resource = Resource.Desert
  number: number | null = null

  constructor(resource: Resource, number: number | null) {
    this.resource = resource
    this.number = number
  }

  render() {
    return <div className={scss.tile} data-resource={this.resource}>
      <Tileset resource={this.resource} />
      {this.number && <div className={scss.tileNumber}>{this.number}</div>}
    </div>
  }
}
