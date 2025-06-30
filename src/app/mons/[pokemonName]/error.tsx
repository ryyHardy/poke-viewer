"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div
      className='error'
      role='alert'
    >
      <h1>404 Not Found</h1>
      <h2>Failed to load Pokémon data.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Retry</button>
    </div>
  );
}
