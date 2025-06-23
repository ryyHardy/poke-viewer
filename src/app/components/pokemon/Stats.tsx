import type { PokemonStat } from "@/api/types";
import "./Stats.css";

/** How high a stat must be to max out its meter */
const MaximumStat = 250;

export default function Stats({ stats }: { stats: PokemonStat[] }) {
  return (
    <div className='stats-container'>
      {stats.map((stat, index) => (
        <div key={index}>
          <p>
            {stat.name}: {stat.value}
          </p>
          <div className='stat-bar'>
            <div
              className='stat-bar-fill'
              style={{ width: `${(stat.value / MaximumStat) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
