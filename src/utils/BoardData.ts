import { Resource } from './enums'
import shuffle from 'shuffle-list'

export const Numbers = [
  10,
  2,
  9,
  12,
  6,
  4,
  10,
  9,
  11,
  3,
  8,
  8,
  3,
  4,
  5,
  5,
  6,
  11,
  0,
] as const

export const TileResources = [
  ...shuffle([
    Resource.Wood,
    Resource.Wood,
    Resource.Wood,
    Resource.Wood,
    Resource.Wheat,
    Resource.Wheat,
    Resource.Wheat,
    Resource.Wheat,
    Resource.Stone,
    Resource.Stone,
    Resource.Stone,
    Resource.Clay,
    Resource.Clay,
    Resource.Clay,
    Resource.Sheep,
    Resource.Sheep,
    Resource.Sheep,
    Resource.Sheep,
  ]),
  Resource.Desert,
]

export const TileWidths = [
  [0, 3],
  [3, 4],
  [7, 5],
  [12, 4],
  [16, 3],
]
