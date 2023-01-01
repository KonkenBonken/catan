import { Player, Building, Direction } from './utils/enums'
import { cls } from './utils/utilities'

export default class Corner {
  building: Building | null = null
  owner: Player | null = null

  get hasBuilding() {
    return this.building !== null;
  }

  constructor(readonly direction: Direction) { }

  render() {
    return <div className={cls('corner', { hasBuilding: this.hasBuilding }, Player[this.owner || -1], Direction[this.direction || -1])} />
  }

  build(newOwner: Player, newBuilding: Building) {
    if (
      !this.hasBuilding ||
      (this.building === Building.Village && this.owner === newOwner)
    )
      this.building = newBuilding;
  }
}
