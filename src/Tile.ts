import { Resource } from './types/enums'

export default class Tile {
  resource: Resource = Resource.Desert
  number: number | null = null

  constructor(resource: Resource, number: number | null) {
    this.resource = resource
    this.number = number
  }
}
