import { useFetch } from 'usehooks-ts'
import { calculatePokemonPower } from '../helpers'

const usePokemon = () => {
  const { data, error } = useFetch<Pokemon[]>('./pokemon.json')

  const pokemons = calculatePokemonPower(data)

  return { pokemons, error }
}

export default usePokemon