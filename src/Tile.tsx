import { Resource } from './utils/enums'
import { cls } from './utils/utilities'
import Tileset from './Tileset128'
import { Edge } from './Edge'
import Corner from './Corner'

export default class Tile {
  edges = { NE: new Edge(), E: new Edge(), SE: new Edge() }
  corners = { N: new Corner(), NE: new Corner(), SE: new Corner() }

  constructor(readonly resource: Resource, readonly number: number) { }

  render() {
    return <div className={cls('tile')} data-resource={this.resource}>
      <Tileset resource={this.resource} />
      {!!this.number && <div className={cls('tileNumber')}>{this.number}</div>}
      {
        [this.edges, this.corners]
          .flatMap(Object.values)
          .map(element => element.render())
      }
    </div>
  }
}
