import PokemonList from './components/PokemonList.tsx';
import usePokemon from './hooks/usePokemon.ts';

function App() {
  const { pokemons } = usePokemon()

  return <PokemonList pokemons={pokemons} />;
}

export default App;
