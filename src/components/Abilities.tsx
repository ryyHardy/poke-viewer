import "./Abilities.css";
import type { PokemonAbility } from "../api/types";

export default function Abilities({
  abilities,
}: {
  abilities: PokemonAbility[];
}) {
  return (
    <div className='abilities-container'>
      <h2 className='abilities-title'>Abilities:</h2>
      {abilities.map((ability, index) => (
        <div
          className='ability-container'
          key={index}
        >
          <h3 className='ability-name'>
            {ability.name} <span>{ability.is_hidden ? "(hidden)" : ""}</span>
          </h3>
          <p className='ability-description'>{ability.description}</p>
        </div>
      ))}
    </div>
  );
}
