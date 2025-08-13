import type {
  SpeciesAPI,
  PokemonAPI,
  EvolutionChainAPI,
  PokemonEvolutions,
} from "@/lib/types";
import axiosClient from "@/lib/api/api";
import {
  getPokemonURLByName,
  getPokemonURLByID,
} from "@/lib/api/indivPokeData";

const client = axiosClient();

async function getSpeciesURLs(pokeData: PokemonAPI) {
  const pokeSpeciesURL = await client.get<SpeciesAPI>(pokeData.species.url);
  const pokeSpecies = pokeSpeciesURL.data;
  return pokeSpecies;
}

async function getEvolutionChainData(pokeSpecies: SpeciesAPI) {
  const pokeEvolutionChainsList = await client.get<EvolutionChainAPI>(
    pokeSpecies.evolution_chain.url
  );
  const pokeEvolutionChains = pokeEvolutionChainsList.data;
  return pokeEvolutionChains;
}

async function mergeEvolutionChainData(pokeEvolutionChains: EvolutionChainAPI) {
  const pokeChainLink: PokemonEvolutions[] = [];

  const pokeLinkInfoByName1 = await getPokemonURLByName(
    pokeEvolutionChains.chain.species.name
  );
  const pokeLinkInfoById1 = await getPokemonURLByID(
    pokeLinkInfoByName1.id.toString()
  );

  let pokeChainLink2: PokemonEvolutions[] = [];

  if (pokeEvolutionChains.chain.evolves_to) {
    pokeChainLink2 = await Promise.all(
      pokeEvolutionChains.chain.evolves_to.map(async (link2) => {
        const pokeLinkInfoByName2 = await getPokemonURLByName(
          link2.species.name
        );
        const pokeLinkInfoById2 = await getPokemonURLByID(
          pokeLinkInfoByName2.id.toString()
        );
        let pokeChainLink3: PokemonEvolutions[] = [];

        if (link2.evolves_to) {
          pokeChainLink3 = await Promise.all(
            link2.evolves_to.map(async (link3) => {
              const pokeLinkInfoByName3 = await getPokemonURLByName(
                link3.species.name
              );
              const pokeLinkInfoById3 = await getPokemonURLByID(
                pokeLinkInfoByName3.id.toString()
              );

              const chainLink3: PokemonEvolutions = {
                name: link3.species.name,
                id: pokeLinkInfoByName3.id,
                sprite:
                  pokeLinkInfoById3.sprites.other["official-artwork"]
                    .front_default,
                types: {
                  1: pokeLinkInfoById3.types[0].type.name,
                  2: pokeLinkInfoById3.types[1]?.type.name,
                },
              };
              return chainLink3;
            })
          );
        }

        const chainLink2: PokemonEvolutions = {
          name: link2.species.name,
          id: pokeLinkInfoByName2.id,
          sprite:
            pokeLinkInfoById2.sprites.other["official-artwork"].front_default,
          types: {
            1: pokeLinkInfoById2.types[0].type.name,
            2: pokeLinkInfoById2.types[1]?.type.name,
          },
          evolvesTo: pokeChainLink3,
        };
        return chainLink2;
      })
    );
  }

  const pokeChainLink1: PokemonEvolutions = {
    name: pokeEvolutionChains.chain.species.name,
    id: pokeLinkInfoByName1.id,
    sprite: pokeLinkInfoById1.sprites.other["official-artwork"].front_default,
    types: {
      1: pokeLinkInfoById1.types[0].type.name,
      2: pokeLinkInfoById1.types[1]?.type.name,
    },
    evolvesTo: pokeChainLink2,
  };
  pokeChainLink.push(pokeChainLink1);
  return pokeChainLink;
}

export { getSpeciesURLs, getEvolutionChainData, mergeEvolutionChainData };
