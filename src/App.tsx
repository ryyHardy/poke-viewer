import { useState, useEffect } from "react";

import Stats from "./components/Stats";
import Typing from "./components/Typing";
import Sprite from "./components/Sprite";
import Abilities from "./components/Abilities";

import { getPokemonData } from "./api/pokemon";
import type { Pokemon } from "./api/types";

const pokemonName: string = "gliscor";

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
    <main>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <Sprite sprite={pokemon.sprites.normal_url} />
      <Typing types={pokemon.types} />
      <Stats stats={pokemon.stats} />
      <Abilities abilities={pokemon.abilities} />
    </main>
  );
}

export default App;
