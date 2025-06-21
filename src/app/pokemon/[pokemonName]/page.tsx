import { getPokemonData } from "@/api/client";

import Sprite from "@/app/components/pokemon/Sprite";
import Typing from "@/app/components/pokemon/Typing";
import Stats from "@/app/components/pokemon/Stats";
import Abilities from "@/app/components/pokemon/Abilities";

export default async function Page({
  params,
}: {
  params: Promise<{ pokemonName: string }>;
}) {
  const { pokemonName } = await params;
  const pokemon = await getPokemonData(pokemonName);

  return (
    <main className='page-pokemon'>
      <h1>{pokemon.name.toUpperCase()}</h1>
      <Sprite sprites={pokemon.sprites} />
      <Typing types={pokemon.types} />
      <Stats stats={pokemon.stats} />
      <Abilities abilities={pokemon.abilities} />
    </main>
  );
}
