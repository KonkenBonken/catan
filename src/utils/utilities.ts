import scss from '../index.module.scss'

export function cls(...classNames: string[]) {
  return classNames.map((className) => scss[className]).join(' ')
}
