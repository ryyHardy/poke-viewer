"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  <div
    className='error'
    role='alert'
  >
    <h1>404 Not Found</h1>
    <p>Failed to load Pokémon data.</p>
    <button onClick={() => router.push("/")}>Return Home</button>
  </div>;
}
