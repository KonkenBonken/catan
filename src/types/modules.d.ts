declare module 'shuffle-list' {
  export default function shuffle<T>(array: T[]): T[]
}

declare module '*.module.scss' {
  declare const classNames: Record<string, string>
  export default classNames
}

declare module '*.png'
