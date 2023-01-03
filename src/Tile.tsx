import { Resource } from './utils/enums'
import { cls } from './utils/utilities'
import Tileset from './Tileset128'

export default class Tile {

  constructor(readonly resource: Resource, readonly number: number) { }

  render() {
    return <div className={cls('tile')} >
      <Tileset resource={this.resource} />
      {!!this.number && <div className={cls('tileNumber')}>{this.number}</div>}
    </div>
  }
}
