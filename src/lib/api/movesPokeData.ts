import type {
  PokemonAPI,
  MovesAPI,
  MoveAPI,
  MoveDescriptionAPI,
} from "@/lib/types";
import axiosClient from "@/lib/api/api";

const client = axiosClient();

async function getMovesURLs(pokeData: PokemonAPI) {
  const pokeMoves: MovesAPI[] = [];

  pokeData.moves.map((item: MovesAPI) => {
    const moveInfo: MovesAPI = {
      move: {
        name: item.move.name,
        url: item.move.url,
      },
    };
    pokeMoves.push(moveInfo);
  });
  return pokeMoves;
}

async function getMovesData(pokeMoves: MovesAPI[]) {
  const pokeMovesList = await Promise.all(
    pokeMoves.map(async (item: MovesAPI) => {
      const response = await client.get<MoveAPI>(item.move.url);
      return response.data;
    })
  );
  return pokeMovesList;
}

async function mergeMovesData(pokeMovesList: MoveAPI[]) {
  const pokeMovesEffects: MoveDescriptionAPI[][] = [];

  pokeMovesList.map((arr) => {
    const movePerLang: MoveDescriptionAPI[] = [];
    arr.flavor_text_entries.map((item) => {
      if (item.language?.name === "en") {
        const moveInfo: MoveDescriptionAPI = {
          flavor_text: item.flavor_text,
          language: {
            name: item.language.name,
          },
        };
        movePerLang.push(moveInfo);
      }
    });
    pokeMovesEffects.push(movePerLang);
  });
  return pokeMovesEffects;
}

export { getMovesURLs, getMovesData, mergeMovesData };
