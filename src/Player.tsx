import shuffle from 'shuffle-list'
import use_Promise from 'use-promise-hook'

import { Building, PlayerColors, Resource } from './utils/enums'
import board from './Board'
import ResourceCard from './ResourceCard'
import { cls } from './utils/utilities'
import rerender from './utils/Rerender';

export class Player {
  resources: ResourceCard[] = [];
  private throwCardsMode = false;

  resolveNextBuilding: () => void;
  nextBuilding: Promise<void>;
  resolveNextRoad: () => void;
  nextRoad: Promise<void>;

  constructor(readonly color: PlayerColors) {
    [this.nextBuilding, this.resolveNextBuilding] = use_Promise();
    [this.nextRoad, this.resolveNextRoad] = use_Promise();
  };

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

  onBuilding() {
    this.resolveNextBuilding();
    [this.nextBuilding, this.resolveNextBuilding] = use_Promise();
  }

  onRoad() {
    this.resolveNextRoad();
    [this.nextRoad, this.resolveNextRoad] = use_Promise();
  }

  addResource(resource: Resource, tileDiv?: HTMLDivElement, town = false) {
    this.resources.push(new ResourceCard(resource, tileDiv));
    if (town)
      this.resources.push(new ResourceCard(resource, tileDiv));
    rerender();
  }

  async throwCards(count: number) {
    this.throwCardsMode = true;

    const selectedCards: ResourceCard[] = [];

    await new Promise<void>(resolve => {
      for (const card of this.resources)
        card.throwCardsMode(selectedCards, () => {
          if (selectedCards.length === count)
            resolve()
        });
    });

    this.resources = this.resources.filter(card => !selectedCards.includes(card));

    for (const card of this.resources)
      card.throwCardsMode(false);

    this.throwCardsMode = false;
    rerender();
  }

  render(myTurn: boolean) {
    return <div className={cls('player', this.name, { myTurn, throwCards: this.throwCardsMode })}>
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

export default new (class Players extends Array<Player> {
  readonly Red = new Player(PlayerColors.Red);
  readonly Yellow = new Player(PlayerColors.Yellow);
  readonly Blue = new Player(PlayerColors.Blue);
  readonly Green = new Player(PlayerColors.Green);

  private playerOrder = shuffle([this.Red, this.Yellow, this.Blue, this.Green]);

  protected readonly 0 = this.playerOrder[0];
  protected readonly 1 = this.playerOrder[1];
  protected readonly 2 = this.playerOrder[2];
  protected readonly 3 = this.playerOrder[3];

  private readonly turnGenerator = (function* (players: Player[]) {
    let i = 0;
    while (true)
      yield players[i++ % players.length]
  })(this.playerOrder);

  currentPlayer = this.turnGenerator.next().value;

  nextPlayer() {
    this.currentPlayer = this.turnGenerator.next().value;
    rerender();
    return this.currentPlayer;
  }
})()