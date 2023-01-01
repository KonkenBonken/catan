import { Player, Direction } from './utils/enums'
import { cls } from './utils/utilities'

export class Edge {
  owner: Player | null = null

  get hasRoad() {
    return this.owner !== null;
  }

  constructor(readonly direction: Direction) { }

  render() {
    return <div className={cls('edge', { hasRoad: this.hasRoad }, Player[this.owner || -1], Direction[this.direction || -1])} />
  }

  build(newOwner: Player) {
    if (!this.hasRoad)
      this.owner = newOwner;
  }
}