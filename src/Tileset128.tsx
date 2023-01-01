/* eslint-disable jsx-a11y/alt-text */
import { cls } from './utils/utilities'
import { Resource } from './utils/enums'

import DesertSrc from './assets/Desert.jpg'
import WoodSrc from './assets/Wood.jpg'
import WheatSrc from './assets/Wheat.jpg'
import StoneSrc from './assets/Stone.jpg'
import ClaySrc from './assets/Clay.jpg'
import SheepSrc from './assets/Sheep.jpg'

const tileTexture = {
  [Resource.Desert]: DesertSrc,
  [Resource.Wood]: WoodSrc,
  [Resource.Wheat]: WheatSrc,
  [Resource.Stone]: StoneSrc,
  [Resource.Clay]: ClaySrc,
  [Resource.Sheep]: SheepSrc,
} as Record<Resource, string>;

export default function Tile({ resource }: { resource: Resource }) {
  return (
    <img src={tileTexture[resource]} className={cls('tileImage')} />
  )

}

