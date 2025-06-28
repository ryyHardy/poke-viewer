import { fetchAllPokemonNames } from "@/api/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const names = await fetchAllPokemonNames();
    return NextResponse.json(names);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch names" },
      { status: 500 }
    );
  }
}
