import { useEffect, useState } from "react";
import axiosClient from "@/lib/api";

interface pokemon {
  id: number;
  name: string;
  url: string;
  spriteFront: string;
  spriteShiny?: string;
  type1: string;
  type2?: string;
}

// type pokemon = {
//   stat: number; // HP, Attack, Defense, Special Attack, Special Defense, Speed
//   ability: string; //Expand to show desc
//   abilitiyDesc: string;
//   move: string;
//   movePwr: number;
//   moveAcc: number;
//   moveType: string;
//   species: string; // We need to get the species from this endpoint: https://pokeapi.co/api/v2/pokemon-species/{id or name}/
//   // Then we can get the evolution chain url from which we can extract the id https://pokeapi.co/api/v2/evolution-chain/2/
//   evolution: string; // We use the id from right above to get the Evolution Chain.
//   // Read doc to figure out how to get the ID the pokemon part of the evolution Chain
//   location: string; // If applicable. This requires a specific endpoint https://pokeapi.co/api/v2/pokemon/{id or name}/encounters
// };

function API() {
  const [pokemons, setPokemons] = useState<pokemon[]>([]);

  useEffect(() => {
    const client = axiosClient();

    const fetchPokemon = async () => {
      try {
        const result1 = await client.get("https://pokeapi.co/api/v2/pokemon/", {
          params: {
            limit: 60,
            offset: 0,
          },
        });
        // What the API returns { results: [{ name, url }] }

        const pokeData = result1.data.results;
        // console.log(pokeData);

        setPokemons(
          pokeData.map((item: pokemon) => ({
            name: item.name,
            url: item.url,
          }))
        );

        try {
          const result2 = await Promise.all(
            pokeData.map(async (item: pokemon) => await client.get(item.url))
          );
          //   console.log(result2[0].data);

          setPokemons(
            pokeData.map((item: pokemon, idx: number) => ({
              ...item,
              id: result2[idx].data.id,
              spriteFront:
                result2[idx].data.sprites.other["official-artwork"]
                  .front_default,
              spriteShiny: result2[idx].data.sprites.other["official-artwork"]
                .front_shiny
                ? result2[idx].data.sprites.other["official-artwork"]
                    .front_shiny
                : "",
              type1: result2[idx].data.types[0].type.name,
              type2: result2[idx].data.types[1]?.type.name,
            }))
          );
        } catch (error) {
          console.error("Error fetching individual Pokemon data:", error);
        }
      } catch (error) {
        console.error("Error fetching Pokemon API data:", error);
      }
    };
    fetchPokemon();
  }, []);

  return pokemons;
}

export default API;
