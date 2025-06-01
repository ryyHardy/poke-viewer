/**
 * This file acts as an adapter between the pokemon API model and the model we plan to use
 * for the PokeViewer components, whatever that API may be
 *
 * The API response may have a complicated schema, so this file contains a function that adapts
 * the API response to the simplified model used for the components
 */

import type { Pokemon } from "./types";

/**
 * The schema for the /pokemon-species API response
 */
export interface SpeciesResponse {
  name: string;
  varieties: Array<{
    is_default: boolean;
    pokemon: {
      name: string;
      // url: string; // Don't need this right now :)
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
}

/**
 * Converts from the pokemon API model to the PokeViewer simplified model
 * @param response Pokemon API response
 * @returns
 */
export function adaptPokemonAPIResponse(response: PokemonResponse): Pokemon {
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
  };
}
