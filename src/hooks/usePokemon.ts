import { useEffect, useState, useRef } from "react";
import CachePokemonData from "@/lib/cache";
import {
  createDatabase,
  getAllPokemon,
  checkCacheValidity,
  db,
} from "@/lib/cache";
import type { Pokemon } from "@/lib/types";
import {
  getPokemonURLs,
  getListPokemonData,
  mergeMainPokemonData,
} from "@/lib/api/mainPokeData";
import { handleError } from "@/lib/utils";

export const pokePerPage = 20;

function useMainPokemonData(startIndex: number) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use refs to track component state
  const mountedRef = useRef(true);
  const cachedPagesRef = useRef<Map<number, Pokemon[]>>(new Map());

  useEffect(() => {
    mountedRef.current = true;

    const loadPokemon = async () => {
      try {
        setIsLoading(true);
        setPokemons([]); // Reset pokemon state

        const currentPage = Math.floor(startIndex / pokePerPage) + 1;

        // Check if this specific page is already cached in memory
        if (cachedPagesRef.current.has(currentPage)) {
          const cachedPageData = cachedPagesRef.current.get(currentPage)!;
          if (mountedRef.current) {
            setPokemons(cachedPageData);
            setIsLoading(false);
            return;
          }
        }

        // Initialize database if needed
        if (!db) {
          await createDatabase();
        }

        const isCacheValid = await checkCacheValidity();
        if (isCacheValid) {
          const cachedData = await getAllPokemon();

          if (cachedData?.length > 0) {
            // I create a map of cached Pokemon by their position/index
            // & calculate the expected IDs for this page to check if they're
            // all present in the cache
            const expectedStartId = startIndex + 1; // Pokemon IDs are 1-indexed
            const expectedEndId = startIndex + pokePerPage;

            // Filter cached data to only include Pokemon that belong to this page
            const pageData = cachedData.filter((pokemon) => {
              return (
                pokemon.id &&
                pokemon.id >= expectedStartId &&
                pokemon.id <= expectedEndId
              );
            });

            // Only use cached data if we have ALL Pokemon for this page
            if (pageData.length === pokePerPage && mountedRef.current) {
              // Sort by ID to ensure correct order
              pageData.sort((a, b) => {
                const idA = a.id || 0;
                const idB = b.id || 0;
                return idA - idB;
              });

              // Cache this page in memory for faster subsequent access
              cachedPagesRef.current.set(currentPage, pageData);
              setPokemons(pageData);
              setIsLoading(false);
              return;
            }
          }
        }

        // If we get here, either cache was invalid or empty and we need to fetch fresh data
        const pokeDataListURLs = await getPokemonURLs();

        const pokeDataList = await getListPokemonData(
          pokePerPage,
          startIndex,
          pokeDataListURLs
        );

        // Merge the successfully fetched data
        const pokemonMainData = await mergeMainPokemonData(
          pokePerPage,
          startIndex,
          pokeDataList,
          pokeDataListURLs
        );

        if (mountedRef.current) {
          // Cache this page in memory
          cachedPagesRef.current.set(currentPage, pokemonMainData);

          // Also update the full cache in IndexedDB
          // Only cache the specific Pokemon from this page to avoid mixing with detailed Pokemon data
          await CachePokemonData(pokemonMainData);

          setPokemons(pokemonMainData);
          setIsLoading(false);
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
  }, [startIndex]);
  return { pokemons, isLoading, error };
}

export default useMainPokemonData;
