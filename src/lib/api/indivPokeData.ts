import type { PokemonAPI } from "@/lib/types";
import axiosClient from "@/lib/api/api";

const client = axiosClient();

async function getPokemonURLByID(pokeId: string) {
  const pokeDataURL = await client.get<PokemonAPI>(
    `https://pokeapi.co/api/v2/pokemon/${pokeId}`
  );
  const pokeData = pokeDataURL.data;
  return pokeData;
}

async function getPokemonURLByName(pokeName: string) {
  const pokeDataURL = await client.get<PokemonAPI>(
    `https://pokeapi.co/api/v2/pokemon-species/${pokeName}`
  );
  const pokeData = pokeDataURL.data;
  return pokeData;
}

export { getPokemonURLByID, getPokemonURLByName };
