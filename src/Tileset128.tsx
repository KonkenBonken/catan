/* eslint-disable jsx-a11y/alt-text */
import scss from './index.module.scss'

import { Resource } from './types/enums'
import Tiles128 from './assets/Tiles128.png'

const hexagonRatio = 1.1547005;

console.log(scss)

const tileXY = {
  [Resource.Desert]: [0, 0],
  [Resource.Wood]: [2, 2],
  [Resource.Wheat]: [1, 1],
  [Resource.Stone]: [0, 2],
  [Resource.Clay]: [1, 2],
  [Resource.Sheep]: [2, 1],
} as Record<Resource, [number, number]>;

export default function Tile({ resource }: { resource: Resource }) {
  const [x, y] = tileXY[resource];

  return (
    <div className={scss.tileImageWrapper} >
      <img src={Tiles128} style={{
        objectPosition: `-${x * 128}px -${y * 128 * hexagonRatio}px`
      }} />
    </div>
  )

}

