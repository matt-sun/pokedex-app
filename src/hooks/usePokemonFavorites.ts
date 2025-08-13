import { useEffect, useState, useRef } from "react";
import { getAllFavoritePokemon } from "@/lib/cache";
import type { Pokemon } from "@/lib/types";
import { handleError } from "@/lib/utils";

export const pokePerPage = 20;

function useFavoritesPokemonData(startIndex: number) {
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
        const currentPage = Math.floor(startIndex / pokePerPage) + 1;

        const data = await getAllFavoritePokemon();

        // Get the slice for the current page from cached data
        const pageStartIndex = startIndex;
        const pageEndIndex = startIndex + pokePerPage;
        const pageData = data.slice(pageStartIndex, pageEndIndex);

        if (pageData.length > 0 && mountedRef.current) {
          // Cache this page in memory for faster subsequent access
          cachedPagesRef.current.set(currentPage, pageData);
          setPokemons(pageData);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        handleError(
          error,
          "Failed to fetch favorites data",
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

export default useFavoritesPokemonData;
