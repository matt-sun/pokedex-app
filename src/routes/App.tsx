import { useEffect, useState } from "react";
import axiosClient from "@/lib/api";
import Layout from "@/components/layout/Layout";

interface pokemon {
  id: number;
  name: string;
  url: string;
}

// type pokemon = {
//   id: number;
//   name: string;
//   sprite: string; // front and shiny
//   type: string;
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

function App() {
  const [pokemons, setPokemons] = useState<pokemon[]>([]);

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
        console.log(pokeData);

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
          console.log(result2[0].data);

          setPokemons(
            result2.map<pokemon>((item) => ({
              id: item.data.id,
              name: item.data.name,
              url: "https://pokeapi.co/api/v2/pokemon/" + item.data.id + "/",
              // This is not ok yet, how do I fetch the name and url from Pokedata?
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

  return (
    <div>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          {pokemon.id}. {pokemon.name} @"
          {pokemon.url}
        </div>
      ))}
      <Layout />
    </div>
  );
}

export default App;
