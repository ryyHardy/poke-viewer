export interface PokemonStat {
  name: string;
  value: number;
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
