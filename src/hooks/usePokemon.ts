import { useEffect, useState, useRef } from "react";
import axiosClient from "@/lib/api";
import CachePokemonData from "@/lib/cache";
import {
  createDatabase,
  getAllPokemon,
  checkCacheValidity,
  db,
} from "@/lib/cache";
import type {
  Pokemon,
  PokemonAbilities,
  PokemonLocations,
  PokemonAPI,
  AllPokemonAPI,
  AbilitiesAPI,
  AbilityAPI,
  EffectAPI,
  LocationAreaAPI,
  // MovesAPI,
  // MoveAPI,
  // SpeciesAPI,
  // EvolutionChainAPI,
  // ChainLinkAPI,
} from "@/lib/types";
import type { AxiosResponse } from "axios";

const client = axiosClient();

function usePokemonData() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use refs to track component state
  const hasAttemptedLoad = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    if (hasAttemptedLoad.current) {
      return;
    }
    hasAttemptedLoad.current = true;

    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        setPokemons([]); // Reset pokemon state

        // First check if we have valid cached data
        if (!db) {
          await createDatabase();
        }

        const isCacheValid = await checkCacheValidity();
        if (isCacheValid) {
          const cachedData = await getAllPokemon();
          if (cachedData?.length > 0 && mountedRef.current) {
            setPokemons(cachedData);
            setIsLoading(false);
            return;
          }
        }

        // If we get here, either cache was invalid or empty and we need to fetch fresh data
        const pokeData = await getPokemonURLs();

        const result2 = await getMainPokemonData(pokeData);
        const pokeData2 = await mergeMainPokemonData(result2, pokeData);
        const pokeAbilities = await getAbilitiesURLs(pokeData2);

        const result3 = await getAbilitiesData(pokeAbilities);
        const pokeAbilitiesEffects = await mergeAbilitiesData(result3);

        const result4 = await getAndMergeLocationsData(pokeData2);

        try {
          // Merge the successfully fetched data
          console.log("Starting data transformation process...");
          console.log("Number of Pokemon to transform:", pokeData.length);
          console.log("Abilities data available:", pokeAbilities.length);

          const pokemonData = await mergeFullPokemonData(
            pokeData,
            result2,
            pokeAbilities,
            pokeAbilitiesEffects,
            result4
            // pokeLocations
          );

          // Cache the successfully fetched data
          await CachePokemonData(pokemonData);
          if (mountedRef.current) {
            setPokemons(pokemonData);
            setIsLoading(false);
          }
        } catch (error) {
          handleError(
            error,
            "Failed to merge full Pokemon data or to cache it",
            mountedRef,
            setError,
            setIsLoading
          );
        }
      } catch (error) {
        handleError(
          error,
          "Failed to fetch data",
          mountedRef,
          setError,
          setIsLoading
        );
      }
    };

    loadPokemon();

    return () => {
      mountedRef.current = false;
    };
  }, [client]); // Add client as dependency since it's used in the effect

  return { pokemons, isLoading, error };
}

async function getPokemonURLs() {
  console.log("Fetching initial Pokemon data...");
  const result1 = await client.get<{ results: AllPokemonAPI[] }>(
    "https://pokeapi.co/api/v2/pokemon/",
    {
      params: {
        limit: 20,
        offset: 0,
      },
    }
  );
  console.log("Initial Pokemon data received:", result1.data);

  const pokeData: AllPokemonAPI[] = result1.data.results;
  return pokeData;
  // console.log(pokeData);
}

async function getMainPokemonData(pokeData: AllPokemonAPI[]) {
  console.log("Fetching individual Pokemon details...");
  const result2 = await Promise.all(
    pokeData.map(async (item: AllPokemonAPI) => {
      // console.log(`Fetching details for ${item.name}...`);
      return await client.get<PokemonAPI>(item.url);
    })
  );
  console.log("All individual Pokemon details fetched");
  // console.log(result2);
  return result2;
}

async function mergeMainPokemonData(
  result2: AxiosResponse<PokemonAPI>[],
  pokeData: AllPokemonAPI[]
) {
  // This is the retrieved data from the Pokemon API in its base format
  const pokeData2: PokemonAPI[] = [];

  pokeData.map((_: AllPokemonAPI, idx: number) => {
    const info: PokemonAPI = {
      id: result2[idx].data.id,
      abilities: result2[idx].data.abilities,
      location_area_encounters: result2[idx].data.location_area_encounters,
      moves: result2[idx].data.moves,
      species: {
        name: result2[idx].data.species.name,
        url: result2[idx].data.species.url,
      },
      sprites: {
        other: {
          ["official-artwork"]: {
            front_default:
              result2[idx].data.sprites.other["official-artwork"].front_default,
            front_shiny:
              result2[idx].data.sprites.other["official-artwork"].front_shiny,
          },
        },
      },
      stats: result2[idx].data.stats,
      types: result2[idx].data.types,
    };
    pokeData2.push(info);
  });
  console.log(pokeData2);
  return pokeData2;
}

async function getAbilitiesURLs(pokeData2: PokemonAPI[]) {
  const pokeAbilities: Array<AbilitiesAPI[]> = [];

  pokeData2.map((item: PokemonAPI) => {
    const abilityURLs: AbilitiesAPI[] = [];
    item.abilities.map((item2: AbilitiesAPI) => {
      const abilityInfo: AbilitiesAPI = {
        is_hidden: item2.is_hidden,
        ability: {
          name: item2.ability.name,
          url: item2.ability.url,
        },
      };
      abilityURLs.push(abilityInfo);
    });
    pokeAbilities.push(abilityURLs);
  });
  // console.log(pokeAbilities);
  return pokeAbilities;
}

async function getAbilitiesData(pokeAbilities: Array<AbilitiesAPI[]>) {
  console.log("Fetching abilities data...");
  const result3 = await Promise.all(
    pokeAbilities.map(async (item: AbilitiesAPI[]) => {
      return await Promise.all(
        item.map(async (item2: AbilitiesAPI) => {
          const response = await client.get<AbilityAPI>(item2.ability.url);
          return response.data;
        })
      );
    })
  );
  console.log("All abilities data fetched successfully");
  // console.log(result3);
  return result3;
}

async function mergeAbilitiesData(result3: AbilityAPI[][]) {
  console.log("Writing abilities effects...");
  const pokeAbilitiesEffects: EffectAPI[][][] = [];

  result3.map((arr) => {
    const effectsPerPoke: EffectAPI[][] = [];
    arr.map((sub_arr) => {
      const effectPerLang: EffectAPI[] = [];
      sub_arr.effect_entries.map((item) => {
        if (item.language?.name === "en") {
          const effectInfo: EffectAPI = {
            effect: item.effect,
            language: {
              name: item.language.name,
            },
            short_effect: item.short_effect,
          };
          effectPerLang.push(effectInfo);
        }
      });
      effectsPerPoke.push(effectPerLang);
    });
    pokeAbilitiesEffects.push(effectsPerPoke);
  });
  console.log("Abilities effects written successfully");
  // console.log(pokeAbilitiesEffects);
  return pokeAbilitiesEffects;
}

async function getAndMergeLocationsData(pokeData2: PokemonAPI[]) {
  console.log("Fetching all locations list...");
  const result4 = await Promise.all(
    pokeData2.map(async (item: PokemonAPI) => {
      // console.log(
      //   `Fetching list of encounter locations for ${item.species.name}...`
      // );
      const response = await client.get<LocationAreaAPI[]>(
        item.location_area_encounters
      );
      return response.data;
    })
  );
  console.log("All locations lists fetched");
  console.log(result4);

  const pokeLocations: LocationAreaAPI[][] = [];

  result4.map((arr) => {
    const locationsPerPoke: LocationAreaAPI[] = [];
    arr.map((item) => {
      const locationInfo: LocationAreaAPI = {
        location_area: {
          name: item.location_area.name,
        },
      };
      locationsPerPoke.push(locationInfo);
    });
    pokeLocations.push(locationsPerPoke);
  });
  console.log(pokeLocations);
  console.log("All location data merged successfully");
  return pokeLocations;
}

async function mergeFullPokemonData(
  pokeData: AllPokemonAPI[],
  result2: AxiosResponse<PokemonAPI>[],
  pokeAbilities: Array<AbilitiesAPI[]>,
  pokeAbilitiesEffects: EffectAPI[][][],
  result4: LocationAreaAPI[][]
) {
  console.log("Starting final data transformation...");
  const pokemonData = pokeData.map((item: Pokemon, idx: number) => {
    // console.log(`Transforming data for Pokemon ${item.name}...`);
    return {
      ...item,
      name: item.name,
      url: item.url,
      id: result2[idx].data.id,
      sprites: {
        front:
          result2[idx].data.sprites.other["official-artwork"].front_default,
        shiny:
          result2[idx].data.sprites.other["official-artwork"].front_shiny || "",
      },
      types: {
        1: result2[idx].data.types[0].type.name,
        2: result2[idx].data.types[1]?.type.name,
      },
      stats: {
        hp: result2[idx].data.stats[0].base_stat,
        attack: result2[idx].data.stats[1].base_stat,
        defense: result2[idx].data.stats[2].base_stat,
        speAtt: result2[idx].data.stats[3].base_stat,
        speDef: result2[idx].data.stats[4].base_stat,
        speed: result2[idx].data.stats[5].base_stat,
      },
      abilities: pokeAbilities[idx].map((abil, abilIdx) => ({
        name: abil.ability.name,
        hidden: abil.is_hidden,
        effect: pokeAbilitiesEffects[idx][abilIdx][0].effect,
        shortened: pokeAbilitiesEffects[idx][abilIdx][0].short_effect,
      })) as PokemonAbilities[],
      locations: result4[idx].map((_, locIdx) => ({
        name: result4[idx][locIdx].location_area.name.replace(/-/g, " "),
      })) as PokemonLocations[],
    };
  });
  console.log("Final data transformation complete");
  return pokemonData;
}

function handleError(
  error: unknown,
  defaultMessage: string,
  mountedRef: React.RefObject<boolean>,
  setError: (value: React.SetStateAction<string | null>) => void,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) {
  const message = error instanceof Error ? error.message : defaultMessage;
  console.error(defaultMessage + ":", error);
  if (mountedRef.current) {
    setError(message);
    setIsLoading(false);
  }
}

export default usePokemonData;
