declare global {
  interface Pokemon {
    id: number
    name: string
    type: string[]
    hp: number
    attack: number
    defense: number
    special_attack: number
    special_defense: number
    speed: number
    power: number
  }

  interface Column {
    id: string
    label: string
    minWidth?: number
    align?: 'center',
    type?: 'text' | 'array'
    bg?: string
  }
}

export { }