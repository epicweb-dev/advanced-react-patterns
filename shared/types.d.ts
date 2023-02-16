type PokemonData = {
  id: string
  number: string
  name: string
  image: string
  color: string
  attacks: {
    special: Array<{
      name: string
      type: string
      damage: number
    }>
  }
}

type User = {name: string; image: string}

export {PokemonData, User}
