import type Player from './Player'
import type Edge from './Edge'
import type Corner from './Corner'
import type Tile from './Tile'
import { Building } from './utils/enums'

export default abstract class Buildable {
  owner: Player | null = null
  private memo: {
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

  get neighboringEdges() {
    return this.memo.neighboringEdges ??= this._neighboringEdges
  }
  get neighboringTiles() {
    return this.memo.neighboringTiles ??= this._neighboringTiles
  }
  get neighboringCorners() {
    return this.memo.neighboringCorners ??= this._neighboringCorners
  }

  protected abstract get _neighboringEdges(): Edge[]
  protected abstract get _neighboringTiles(): Tile[]
  protected abstract get _neighboringCorners(): Corner[]

  protected abstract get canBuild(): boolean

  abstract build(newBuilding: Building): void
  abstract render(): JSX.Element
}
