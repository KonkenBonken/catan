import { PlayerColors, Building } from './utils/enums'
import Player, { Players } from './Player'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender'
import board from './Board';

export default class Corner {
  building: Building | null = null
  owner: Player | null = null

  get color() {
    return this.owner?.color;
  }

  get hasBuilding() {
    return this.building !== null;
  }

  get neighboringEdges() {
    return board.edges.flat().filter(edge => edge.neighboringCorners.includes(this));
  }

  get neighboringCorners() {
    return this.neighboringEdges.flatMap(edge => edge.neighboringCorners).filter(corner => corner !== this);
  }

  render() {
    return <div
      onClick={() => this.onClick()}
      className={cls('corner', { hasBuilding: this.hasBuilding, hasTown: this.building === Building.Town }, PlayerColors[this.color ?? -1])}
    >
      {this.building === Building.Town && <>
        <div className={cls('townHouse')} />
        <div className={cls('townHouse')} />
      </>}
    </div>
  }

  private onClick() {
    this.build(
      [Players.Red, Players.Yellow, Players.Blue, Players.Green][Math.floor(Math.random() * 4)],
      [Building.House, Building.Town][Math.floor(Math.random() * 2)]
    )
  }

  build(newOwner: Player, newBuilding: Building) {
    if (
      !this.hasBuilding ||
      (this.building === Building.House && this.owner === newOwner)
    ) {
      this.owner = newOwner;
      this.building = newBuilding;
      rerender();
    }
  }
}
