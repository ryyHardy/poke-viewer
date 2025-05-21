import "./Typing.css";

export default function Typing({ types }: { types: string[] }) {
  return (
    <div className='typing-container'>
      {types.map((type, index) => (
        <div
          key={index}
          className={`type-container ${type}-type`}
        >
          {type}
        </div>
      ))}
    </div>
  );
}
