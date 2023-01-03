declare module 'shuffle-list' {
  export default function shuffle<T>(array: T[]): T[]
}

declare module '*/index.module.scss' {
  declare const classNames: Record<string, string>
  export default classNames
}

declare module '*.png' {
  declare const src: string
  export default src
}
