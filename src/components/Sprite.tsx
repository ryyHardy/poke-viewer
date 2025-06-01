import "./Sprite.css";

export default function Sprite({ sprite }: { sprite: string }) {
  return (
    <img
      className='sprite-img'
      src={sprite}
      alt='pokemon sprite'
    />
  );
}
