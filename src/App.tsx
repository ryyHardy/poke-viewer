import { useState, useEffect } from "react";
import Stats from "./components/Stats";
import Typing from "./components/Typing";
import { getPokemonData } from "./api/pokemon";
import type { Pokemon } from "./api/types";

const pokemonName: string = "minior";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getPokemonData(pokemonName)
      .then(result => {
        setPokemon(result);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return null;

  return (
    <>
      <Typing types={pokemon.types} />
      <Stats stats={pokemon.stats} />
    </>
  );
}

export default App;
