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
            // FIX BOUNCE ANIMATION. The animation works in itself, but it seems that adding "styles" made it break.
            className={`group rounded-xl overflow-hidden flex flex-col flex-1 hover:-translate-y-2 transform transition-all duration-300 ease-in-out ${
              activeCard === pokemon.id ? "scale-95 shadow-2xl" : ""
            } hover:shadow-xl hover:bg-gray-300/50`}
            style={{
              animation: `${
                pokemon.id
                  ? pokemon.id % 4 === 1
                    ? "var(--animate-fade-in-right)"
                    : pokemon.id % 4 === 2
                    ? "var(--animate-fade-in-down)"
                    : pokemon.id % 4 === 3
                    ? "var(--animate-fade-in-up)"
                    : "var(--animate-fade-in-left)"
                  : "none"
              }`,
              animationDelay: `${Math.random() * 0.5}s`,
              opacity: 0,
            }}
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
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
          </Link>
        ))}
    </div>
  );
}

export default PokemonGrid;
