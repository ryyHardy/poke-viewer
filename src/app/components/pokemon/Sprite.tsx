"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import "./Sprite.css";

export default function Sprite({
  spriteParams,
}: {
  spriteParams: { name: string; normal_url: string; shiny_url: string };
}) {
  const [isShiny, setIsShiny] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    setIsShiny(s => !s);
  };

  return (
    <button
      className='sprite-button'
      onClick={handleClick}
      aria-pressed={isShiny}
      aria-label={isShiny ? "Show normal sprite" : "Show shiny sprite"}
    >
      <Image
        ref={imgRef}
        className='sprite-img'
        src={isShiny ? spriteParams.shiny_url : spriteParams.normal_url}
        alt={`${spriteParams.name} sprite`}
        width={350}
        height={350}
        quality={100}
        unoptimized
        priority
      />
    </button>
  );
}
