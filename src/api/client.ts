import {
  adaptPokemonAPIResponse,
  type PokemonResponse,
  type AbilityResponse,
  type EndpointResourceList,
} from "./adapter";
import type { Pokemon } from "./types";

const BASE_URL = "https://pokeapi.co/api/v2";

/// Amount of time to revalidate cache (in seconds)
const REVALIDATION_SECONDS = 3600; // 24 hours

export async function fetchAbility(url: string): Promise<AbilityResponse> {
  const response = await fetch(url, {
    next: { revalidate: REVALIDATION_SECONDS },
  });
  if (!response.ok) throw new Error("Ability data not found");
  return response.json();
}

async function fetchPokemon(name: string): Promise<PokemonResponse> {
  const response = await fetch(BASE_URL + `/pokemon/${name}`, {
    next: { revalidate: REVALIDATION_SECONDS },
  });
  if (!response.ok) throw new Error("Pokemon data not found");
  return response.json();
}

/**
 * Get Pokemon data by name
 * @param name Name of the pokemon to fetch
 * @returns A Pokemon object with a simplified data structure
 */
export async function getPokemonData(name: string): Promise<Pokemon> {
  const pokemonData = await fetchPokemon(name);
  return adaptPokemonAPIResponse(pokemonData);
}

export async function fetchAllPokemonNames(): Promise<string[]> {
  const UPPER_POKEMON_LIMIT = 10000;
  const url = BASE_URL + `/pokemon?limit=${UPPER_POKEMON_LIMIT}&offset=0`;

  const res = await fetch(url, { next: { revalidate: REVALIDATION_SECONDS } });
  if (!res.ok) throw new Error("Failed to fetch Pokémon name");
  const data: EndpointResourceList = await res.json();
  return data.results.map((item: { name: string }) => item.name);
}
