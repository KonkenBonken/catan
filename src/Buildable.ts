import type Player from './Player'
import type Edge from './Edge'
import type Corner from './Corner'
import type Tile from './Tile'
import { Building } from './utils/enums'

export default abstract class Buildable {
  owner: Player | null = null
  protected memo: {
    neighboringEdges?: Edge[]
    neighboringCorners?: Corner[]
    neighboringTiles?: Tile[]
  } = {}

  get color() {
    return this.owner?.color
  }

  get isBuilt() {
    return !!this.owner
  }

  abstract get myCoords(): readonly [number, number]

  abstract get neighboringEdges(): Edge[]
  abstract get neighboringTiles(): Tile[]
  abstract get neighboringCorners(): Corner[]

  abstract build(newOwner: Player, newBuilding: Building): void
  abstract render(): JSX.Element
}
