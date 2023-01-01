import { Player } from './utils/enums'
import { cls } from './utils/utilities'

export class Edge {
  owner: Player | null = null

  get hasRoad() {
    return this.owner !== null;
  }

  render() {
    return <div className={cls('edge')}></div>
  }

  build(newOwner: Player) {
    if (!this.hasRoad)
      this.owner = newOwner;
  }
}