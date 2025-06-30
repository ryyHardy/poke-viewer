import type { Metadata } from "next";

import { getPokemonData } from "@/api/client";

import Sprite from "@/app/components/pokemon/Sprite";
import Typing from "@/app/components/pokemon/Typing";
import Stats from "@/app/components/pokemon/Stats";
import Abilities from "@/app/components/pokemon/Abilities";

import "./style.css";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pokemonName: string }>;
}): Promise<Metadata> {
  const { pokemonName } = await params;
  return {
    title: pokemonName.toLowerCase(),
    description: `PokéViewer page for ${pokemonName.toLowerCase()}`,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ pokemonName: string }>;
}) {
  const { pokemonName } = await params;
  const pokemon = await getPokemonData(pokemonName);
  if (!pokemon) {
    notFound();
  }

  return (
    <main className='page-pokemon'>
      <div className='pokemon-container'>
        <h1>{pokemon.name.toUpperCase()}</h1>
        <Sprite
          spriteParams={{
            name: pokemon.name,
            normal_url: pokemon.sprites.normal_url,
            shiny_url: pokemon.sprites.shiny_url,
          }}
        />
        <Typing types={pokemon.types} />
        <Stats stats={pokemon.stats} />
        <Abilities abilities={pokemon.abilities} />
      </div>
    </main>
  );
}
