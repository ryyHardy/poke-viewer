import { useRef, useState } from "react";
import "./Sprite.css";

export default function Sprite({
  sprites,
}: {
  sprites: { normal_url: string; shiny_url: string };
}) {
  const [isShiny, setIsShiny] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsShiny(s => !s);
      setIsFading(false);
    }, 150);
  };

  return (
    <img
      ref={imgRef}
      className={`sprite-img${isFading ? " fade" : ""}`}
      src={isShiny ? sprites.shiny_url : sprites.normal_url}
      alt='pokemon sprite'
      onClick={handleClick}
    />
  );
}
