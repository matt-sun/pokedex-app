import { useEffect, useState, useRef } from "react";
import { CacheDetailedPokemonData } from "@/lib/cache";
import {
  createDatabase,
  getDetailedPokemon,
  checkCacheValidity,
  db,
} from "@/lib/cache";
import type { Pokemon, PokemonAbilities } from "@/lib/types";
import { getPokemonURLByID } from "@/lib/api/indivPokeData";
import {
  getAbilitiesURLs,
  getAbilitiesData,
  mergeAbilitiesData,
} from "@/lib/api/abilitiesPokeData";
import getLocationsData from "@/lib/api/locationsPokeData";
import {
  getMovesURLs,
  getMovesData,
  mergeMovesData,
} from "@/lib/api/movesPokeData";
import {
  getSpeciesURLs,
  getEvolutionChainData,
  mergeEvolutionChainData,
} from "@/lib/api/evolutionsPokeData";
import getAdditionalPokeData from "@/lib/api/additionalPokeData";
import mergeFullPokemonData from "@/lib/api/allPokeData";
import { handleError } from "@/lib/utils";

function useDetailedPokemonData(pokeId: string) {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use ref to track component state
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        setPokemon(undefined); // Reset pokemon state

        // First check if we have valid cached data
        if (!db) {
          await createDatabase();
        }

        const isCacheValid = await checkCacheValidity();

        if (isCacheValid) {
          try {
            const cachedData = await getDetailedPokemon(pokeId);

            const isFullData =
              cachedData &&
              cachedData.abilities &&
              cachedData.abilities.length > 0 &&
              cachedData.abilities.some((ability: PokemonAbilities) => ability.effect);

            if (isFullData && mountedRef.current) {
              setPokemon(cachedData);
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.log(
              "Pokemon not in cache, continuing to API fetch...",
              error
            );
          }
        }
        // If we get here, either cache was invalid or empty and we need to fetch fresh data
        const pokeData = await getPokemonURLByID(pokeId);

        const pokeAbilitiesURLs = await getAbilitiesURLs(pokeData);
        const pokeAbilitiesList = await getAbilitiesData(pokeAbilitiesURLs);
        const pokeAbilitiesEffects = await mergeAbilitiesData(
          pokeAbilitiesList
        );

        const pokeLocations = await getLocationsData(pokeData);

        const pokeMoves = await getMovesURLs(pokeData);
        const pokeMovesList = await getMovesData(pokeMoves);
        const pokeMovesEffects = await mergeMovesData(pokeMovesList);

        const pokeSpecies = await getSpeciesURLs(pokeData);
        const pokeEvolutionChains = await getEvolutionChainData(pokeSpecies);
        const pokeChainLink = await mergeEvolutionChainData(
          pokeEvolutionChains
        );

        const pokeAdditionalData = await getAdditionalPokeData(pokeData);

        try {
          // Merge the successfully fetched data
          const pokemonAllData = await mergeFullPokemonData(
            pokeData,
            pokeAbilitiesURLs,
            pokeAbilitiesEffects,
            pokeLocations,
            pokeMoves,
            pokeMovesList,
            pokeMovesEffects,
            pokeChainLink,
            pokeAdditionalData
          );

          // Cache the successfully fetched data
          await CacheDetailedPokemonData(pokemonAllData);
          if (mountedRef.current) {
            setPokemon(pokemonAllData);
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
  }, [pokeId]);
  return { pokemon, isLoading, error };
}

export default useDetailedPokemonData;
