import { useEffect, useState } from "react";
import axiosClient from "@/lib/api";
import type { Pokemon } from "@/lib/types";

function API() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const client = axiosClient();

    const fetchPokemon = async () => {
      try {
        const result1 = await client.get("https://pokeapi.co/api/v2/pokemon/", {
          params: {
            limit: 20,
            offset: 0,
          },
        });
        // What the API returns { results: [{ name, url }] }

        const pokeData = result1.data.results;
        // console.log(pokeData);

        setPokemons(
          pokeData.map((item: Pokemon) => ({
            name: item.name,
            url: item.url,
          }))
        );

        try {
          const result2 = await Promise.all(
            pokeData.map(async (item: Pokemon) => await client.get(item.url))
          );
          //   console.log(result2[0].data);

          setPokemons(
            pokeData.map((item: Pokemon, idx: number) => ({
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
              stats: {
                hp: result2[idx].data.stats[0].base_stat,
                attack: result2[idx].data.stats[1].base_stat,
                defense: result2[idx].data.stats[2].base_stat,
                speAtt: result2[idx].data.stats[3].base_stat,
                speDef: result2[idx].data.stats[4].base_stat,
                speed: result2[idx].data.stats[5].base_stat,
              },
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
