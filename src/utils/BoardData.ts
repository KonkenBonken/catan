import { Resource } from './enums'
import shuffle from 'shuffle-list'

export const Numbers = [
  12,
  11,
  11,
  10,
  10,
  9,
  9,
  8,
  8,
  6,
  6,
  5,
  5,
  4,
  4,
  3,
  3,
  2,
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

export const Corners = [3, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 3]
export const Edges = [6, 4, 8, 5, 10, 6, 10, 5, 8, 4, 6]
