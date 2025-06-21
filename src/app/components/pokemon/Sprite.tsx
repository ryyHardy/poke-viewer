"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import "./Sprite.css";

export default function Sprite({
  sprites,
}: {
  sprites: { normal_url: string; shiny_url: string };
}) {
  const [isShiny, setIsShiny] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    setIsShiny(s => !s);
  };

  return (
    <Image
      ref={imgRef}
      className='sprite-img'
      src={isShiny ? sprites.shiny_url : sprites.normal_url}
      alt='pokemon sprite'
      onClick={handleClick}
      width={350}
      height={350}
    />
  );
}
