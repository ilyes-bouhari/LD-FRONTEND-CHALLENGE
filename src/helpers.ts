export const calculatePokemonPower = (pokemons: Pokemon[] | undefined): Pokemon[] | undefined => {
  return pokemons?.map((pokemon) => {
    return {
      ...pokemon,
      power: pokemon.hp +
        pokemon.attack +
        pokemon.defense +
        pokemon.special_attack +
        pokemon.special_defense +
        pokemon.speed
    }
  })
}

interface filterPokemonsProps {
  pokemons: Pokemon[] | undefined
  search: string
  powerThreshold: number
}

export function filterPokemons({ pokemons, ...filters }: filterPokemonsProps) {
  return pokemons?.filter((pokemon: Pokemon) => {
    const bySearch = pokemon.name.toLowerCase().includes(filters.search.toLowerCase())
    const byPowerThreshold = filters.powerThreshold <= pokemon.power

    return bySearch && byPowerThreshold
  })
}