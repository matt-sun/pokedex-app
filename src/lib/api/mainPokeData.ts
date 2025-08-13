import type { AllPokemonAPI, PokemonAPI, Pokemon } from "@/lib/types";
import axiosClient from "@/lib/api/api";
import type { AxiosResponse } from "axios";

const client = axiosClient();

async function getPokemonURLs(): Promise<AllPokemonAPI[]> {
  const pokeDataURLs = await client.get<{ results: AllPokemonAPI[] }>(
    "https://pokeapi.co/api/v2/pokemon/",
    {
      params: {
        limit: 100000,
        offset: 0,
      },
    }
  );

  const pokeDataListURLs: AllPokemonAPI[] = pokeDataURLs.data.results;
  return pokeDataListURLs;
}

async function getListPokemonData(
  pokePerPage: number,
  startIndex: number,
  pokeDataListURLs: AllPokemonAPI[]
) {
  const pokeDataList = await Promise.all(
    pokeDataListURLs
      .slice(startIndex, startIndex + pokePerPage)
      .map(async (item: AllPokemonAPI) => {
        return await client.get<PokemonAPI>(item.url);
      })
  );
  return pokeDataList;
}

async function mergeMainPokemonData(
  pokePerPage: number,
  startIndex: number,
  pokeDataList: AxiosResponse<PokemonAPI>[],
  pokeDataListURLs: AllPokemonAPI[]
) {
  const pokemonDataMain = pokeDataListURLs
    .slice(startIndex, startIndex + pokePerPage)
    .map((item: Pokemon, idx: number) => {
      return {
        ...item,
        name: item.name,
        id: pokeDataList[idx].data.id,
        sprites: {
          front:
            pokeDataList[idx].data.sprites.other["official-artwork"]
              .front_default,
          shiny:
            pokeDataList[idx].data.sprites.other["official-artwork"]
              .front_shiny || "",
        },
        types: {
          1: pokeDataList[idx].data.types[0].type.name,
          2: pokeDataList[idx].data.types[1]?.type.name,
        },
      };
    });
  return pokemonDataMain;
}

export { getPokemonURLs, getListPokemonData, mergeMainPokemonData };
