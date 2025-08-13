import { useContext, useState } from "react";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { Link } from "react-router-dom";
import { PokemonContext } from "@/App";
import type { Pokemon } from "@/lib/types";

// CACHE SEPARATION SOLUTION IMPLEMENTED:
// - Basic Pokemon data (from pagination) is now stored in the "pokemons" cache
// - Detailed Pokemon data (from individual pages) is stored in "pokemonDetails" cache
// - This prevents mixing of sparse detailed data with sequential pagination data
// - Pagination now correctly validates that ALL Pokemon for a page are cached before using cache

function PokemonGrid() {
  const {
    result: { pokemons, isLoading, error },
  } = useContext(PokemonContext);

  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardMouseDown = (pokemonId: number, event: React.MouseEvent) => {
    // Check if the click target is not within the favorite button
    const target = event.target as HTMLElement;
    const favoriteButton = target.closest("[data-favorite-button]");

    if (!favoriteButton) {
      setActiveCard(pokemonId);
    }
  };

  const handleCardMouseUp = () => {
    setActiveCard(null);
  };

  if (error) {
    return <div className="text-center p-4">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="py-4 grid grid-cols-4 mx-auto w-[90%] max-w-6xl min-w-2xs rounded-2xl gap-6 justify-items-center grow">
      {pokemons
        .sort((a, b) => {
          const idA = a.id || 0;
          const idB = b.id || 0;
          return idA - idB;
        })
        .map((pokemon: Pokemon) => (
          <Link
            key={pokemon.id}
            to={`pokemon/${pokemon.id}`}
            className={`flex flex-col flex-1 hover:animate-bounce-once transform transition-all duration-200 ease-in-out ${
              activeCard === pokemon.id ? "scale-95 shadow-2xl" : ""
            }`}
            onMouseDown={(e) => handleCardMouseDown(pokemon.id!, e)}
            onMouseUp={handleCardMouseUp}
            onMouseLeave={handleCardMouseUp}
          >
            <PokemonCard
              id={pokemon.id ? pokemon.id : 0}
              name={pokemon.name}
              spriteF={pokemon.sprites?.front}
              spriteS={pokemon.sprites?.shiny}
              type1={pokemon.types?.[1]}
              type2={pokemon.types?.[2]}
            />
          </Link>
        ))}
    </div>
  );
}

export default PokemonGrid;
