/**
 * This file acts as an adapter between the pokemon API model and the model we plan to use
 * for the PokeViewer components, whatever that API may be
 *
 * The API response may have a complicated schema, so this file contains a function that adapts
 * the API response to the simplified model used for the components
 */

import type { Pokemon } from "./types";
import { fetchAbility } from "./pokemon";

/**
 * The schema for the /pokemon-species API response
 */
export interface SpeciesResponse {
  name: string;
  varieties: Array<{
    is_default: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

// TODO: FIll in the rest of the PokemonResponse interface based on the schema files
/**
 * The schema for the /pokemon API response
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
