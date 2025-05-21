import {
  adaptPokemonAPIResponse,
  type SpeciesResponse,
  type PokemonResponse,
} from "./adapter";
import type { Pokemon } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

/**
 * Get Pokemon data by name
 * @param name Name of the pokemon to fetch
 * @returns A Pokemon object with a simplified data structure
 */
export async function getPokemonData(name: string): Promise<Pokemon> {
  // First get the species to find the default variety
  const response = await fetch(`${BASE_URL}/pokemon-species/${name}`);
  if (!response.ok) throw new Error("Pokemon not found");
  const species: SpeciesResponse = await response.json();

  const defaultVariety = species.varieties.find(v => v.is_default);
  if (!defaultVariety) {
    throw new Error("No default variety found");
  }

  // Then get the actual Pokemon data
  const pokemonResponse = await fetch(
    `${BASE_URL}/pokemon/${defaultVariety.pokemon.name}`
  );
  if (!pokemonResponse.ok) throw new Error("Pokemon data not found");
  const pokemonData: PokemonResponse = await pokemonResponse.json();

  return adaptPokemonAPIResponse(pokemonData);
}
