/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'
import random from 'random'

import { cls } from './utils/utilities'
import { Resource } from './utils/enums'

export default function Tile({ resource }: { resource: Resource }) {
  if (resource === Resource.Sheep) return SheepTile();
  return <div className={cls('tileImage', Resource[resource])} />
}


const _sheepCount = 8,
  getSheepCount = () => random.int(_sheepCount - 2, _sheepCount + 2);
function SheepTile() {
  const sheepCount = useMemo(getSheepCount, []),
    nums = useMemo(() =>
      Array(sheepCount * 4).fill(0).map(() => random.int(10, 90))
      , []);

  return (
    <div className={cls('tileImage', 'Sheep')} >
      {Array(sheepCount).fill(0).map((_, i) =>
        <div key={i} className={cls('animal')} style={{
          left: nums[i * 2] + '%', top: nums[i * 2 + 1] + '%', rotate: nums[i * 2 + 2] * 4 + 'deg', animationDelay: -nums[i * 2 + 3] + 's'
        }} />
      )}
    </div>
  )

}
