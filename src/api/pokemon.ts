import {
  adaptPokemonAPIResponse,
  type SpeciesResponse,
  type PokemonResponse,
  type AbilityResponse,
} from "./adapter";
import type { Pokemon } from "./types";
import { apiCache } from "./cache";

const BASE_URL = "https://pokeapi.co/api/v2";

async function fetchSpecies(name: string): Promise<SpeciesResponse> {
  const key = `species:${name}`;
  // Use global cache to get species and have it request if not found
  return apiCache.get(key, async () => {
    const response = await fetch(`${BASE_URL}/pokemon-species/${name}`);
    if (!response.ok) throw new Error("Pokemon not found");
    return response.json();
  });
}

export async function fetchAbility(url: string): Promise<AbilityResponse> {
  const key = `ability:${url}`;
  return apiCache.get(key, async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Ability data not found");
    return response.json();
  });
}

async function fetchPokemon(url: string): Promise<PokemonResponse> {
  const key = `pokemon:${url}`;
  // Use global cache to get pokemon and have it request if not found
  return apiCache.get(key, async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Pokemon data not found");
    return response.json();
  });
}

/**
 * Get Pokemon data by name
 * @param name Name of the pokemon to fetch
 * @returns A Pokemon object with a simplified data structure
 */
export async function getPokemonData(name: string): Promise<Pokemon> {
  const species = await fetchSpecies(name);

  const defaultVariety = species.varieties.find(v => v.is_default);
  if (!defaultVariety) {
    throw new Error("No default variety found");
  }

  const pokemonData = await fetchPokemon(defaultVariety.pokemon.url);
  return adaptPokemonAPIResponse(pokemonData);
}
