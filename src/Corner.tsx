import { Player, Building } from './utils/enums'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'

export default class Corner {
  building: Building | null = null
  owner: Player | null = null

  get hasBuilding() {
    return this.building !== null;
  }

  render() {
    return <div
      onClick={() => this.onClick()}
      className={cls('corner', { hasBuilding: this.hasBuilding }, Player[this.owner || -1], Building[this.building || -1])}
    />
  }

  private onClick() {
    this.build(
      [Player.Red, Player.Yellow, Player.Blue, Player.Green][Math.floor(Math.random() * 4)],
      [Building.City, Building.Village][Math.floor(Math.random() * 2)]
    )
  }

  build(newOwner: Player, newBuilding: Building) {
    if (
      !this.hasBuilding ||
      (this.building === Building.Village && this.owner === newOwner)
    ) {
      this.owner = newOwner;
      this.building = newBuilding;
      rerender();
    }
  }
}
