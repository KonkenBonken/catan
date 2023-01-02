import { Player } from './utils/enums'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'

export default class Edge {
  owner: Player | null = null

  get hasRoad() {
    return this.owner !== null;
  }

  render() {
    return <div
      onClick={() => this.onClick()}
      className={cls('edge', { hasRoad: this.hasRoad }, Player[this.owner || -1])}
    />
  }

  private onClick() {
    this.build(Player.Green)
  }

  build(newOwner: Player) {
    if (!this.hasRoad) {
      this.owner = newOwner;
      rerender();
    }
  }
}