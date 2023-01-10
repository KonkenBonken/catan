import shuffle from 'shuffle-list'

import { Building, PlayerColors, Resource } from './utils/enums'
import board from './Board'
import ResourceCard from './ResourceCard'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender';

export default class Player {
  resources: ResourceCard[] = []

  constructor(readonly color: PlayerColors) { };

  get Corners() {
    return board.corners.flat().filter(corner => corner.owner === this)
  }

  get Edges() {
    return board.edges.flat().filter(edge => edge.owner === this)
  }

  get points() {
    return this.Corners.length + this.Corners.filter(corner => corner.building === Building.Town).length
  }

  get name() {
    return PlayerColors[this.color]
  }

  addResource(resource: Resource, tileDiv?: HTMLDivElement, town = false) {
    this.resources.push(new ResourceCard(resource, tileDiv));
    rerender();
  }

  render() {
    return <div className={cls('player', this.name)}>
      <div className={cls('name')}>
        Player <span>{this.name}</span>
      </div>
      <div className={cls('resources')} style={{
        '--count': this.resources.length
      } as React.CSSProperties}>
        {this.resources.map(card => card.render())}
      </div>
    </div>
  }
}

export const Players = new (class Players extends Array<Player> {
  readonly Red = new Player(PlayerColors.Red);
  readonly Yellow = new Player(PlayerColors.Yellow);
  readonly Blue = new Player(PlayerColors.Blue);
  readonly Green = new Player(PlayerColors.Green);

  protected 0 = this.Red;
  protected 1 = this.Yellow;
  protected 2 = this.Blue;
  protected 3 = this.Green;
})()

const turnGenerator = (function* () {
  const players = shuffle(Players);
  let i = 0;
  while (true)
    yield players[i++ % players.length]
})()

let currentPlayer = turnGenerator.next().value;

export function getCurrentPlayer() {
  return currentPlayer;
}

export function nextPlayer() {
  currentPlayer = turnGenerator.next().value;
  return currentPlayer;
}