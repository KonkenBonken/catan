import { cls } from './utils/utilities'
import { Resource } from './utils/enums'

export default function Tile({ resource }: { resource: Resource }) {
  return (
    <div className={cls('tileImage', Resource[resource])} />
  )

}

