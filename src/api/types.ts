export interface PokemonStat {
  name: string; // The simplified stat name
  value: number; // The actual stat value
}

export interface Pokemon {
  name: string;
  stats: PokemonStat[];
  types: string[];
}
