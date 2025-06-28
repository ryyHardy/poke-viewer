/**
 * This module acts as an adapter between the Pokémon schema
 * and the simplified schema we plan to use in the PokéViewer components,
 * whatever that API may be.
 */

import type { Pokemon } from "./types";
import { fetchAbility } from "./client";

// TODO: Fill in the rest of the PokemonResponse as needed

/**
 * Schema for /pokemon response
 */
export interface PokemonResponse {
  name: string;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
  }>;
}

/**
 * Schema for /ability response
 */
export interface AbilityResponse {
  names: Array<{
    name: string;
    language: {
      name: string;
    };
  }>;
  effect_entries: Array<{
    short_effect: string;
    language: {
      name: string;
    };
  }>;
}

/**
 * Converts from the pokemon API model to the PokeViewer simplified model
 * @param response Pokemon API response
 * @returns
 */
export async function adaptPokemonAPIResponse(
  response: PokemonResponse
): Promise<Pokemon> {
  const abilityPromises = response.abilities.map(async ability => {
    const abilityData = await fetchAbility(ability.ability.url);
    const name =
      abilityData.names.find(entry => entry.language.name === "en")?.name ||
      "Name not available";
    const description =
      abilityData.effect_entries.find(entry => entry.language.name === "en")
        ?.short_effect || "No description available";

    return {
      name: name,
      description: description,
      is_hidden: ability.is_hidden,
    };
  });

  const abilities = await Promise.all(abilityPromises);

  return {
    name: response.name,
    stats: response.stats.map(s => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    types: response.types.map(t => t.type.name),
    sprites: {
      normal_url: response.sprites.front_default,
      shiny_url: response.sprites.front_shiny,
    },
    abilities,
  };
}

/**
 * Schema for requesting any endpoint without a specific resource ID
 *
 * When requesting a PokeAPI endpoint without
 * a specific resource ID, it will return a paginated
 * list of items available at that endpoint, with URLs linking to those items.
 */
export interface EndpointResourceList {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}
