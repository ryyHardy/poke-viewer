import "./page.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className='page-home'>
      <h2>The zen-like Pokémon Encyclopeida!</h2>
      <Image
        className='pikachu-phd-image'
        src='/pikachu-phd.png'
        alt='Pikachu-PHD Sprite'
        width={500}
        height={500}
        quality={100}
      />
    </main>
  );
}
