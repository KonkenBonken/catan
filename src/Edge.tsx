import { Player } from './utils/enums'
import { cls } from './utils/utilities'

export default class Edge {
  owner: Player | null = null

  get hasRoad() {
    return this.owner !== null;
  }

  render() {
    return <div className={cls('edge', { hasRoad: this.hasRoad }, Player[this.owner || -1])} />
  }

  build(newOwner: Player) {
    if (!this.hasRoad)
      this.owner = newOwner;
  }
}