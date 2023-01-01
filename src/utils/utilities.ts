import clsx from 'clsx'

import scss from '../styles/index.module.scss'

export function cls(...inputs: Parameters<typeof clsx>) {
  return clsx(...inputs)
    .split(' ')
    .map((className) => scss[className])
    .join('')
}
