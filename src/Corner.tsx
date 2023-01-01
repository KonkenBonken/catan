import { Player, Building } from './utils/enums'
import { cls } from './utils/utilities'

export default class Corner {
  building: Building | null = null
  owner: Player | null = null

  get hasBuilding() {
    return this.building !== null;
  }

  render() {
    return <div className={cls('corner')}></div>
  }

  build(newOwner: Player, newBuilding: Building) {
    if (
      !this.hasBuilding ||
      (this.building === Building.Village && this.owner === newOwner)
    )
      this.building = newBuilding;
  }
}
