export interface PokemonStat {
  name: string; // The simplified stat name
  value: number; // The actual stat value
}

export interface PokemonAbility {
  name: string;
  description: string;
  is_hidden: boolean;
}

export interface Pokemon {
  name: string;
  sprites: {
    normal_url: string;
    shiny_url: string;
  };
  stats: PokemonStat[];
  types: string[];
  abilities: PokemonAbility[];
}
