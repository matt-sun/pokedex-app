import { useState, useContext } from "react";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { Link } from "react-router-dom";
import type { Pokemon } from "@/lib/types";
import usePokemonFavoritesData from "@/hooks/usePokemonFavorites";
import { IndexContext } from "@/App";

function FavoritesGrid() {
  // For the Favorites page, I want to start from the first page
  const { startIndex } = useContext(IndexContext);

  const pokemons = usePokemonFavoritesData(startIndex);
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

  return (
    <div className="my-4 py-4 grid grid-cols-4 mx-auto w-[90%] max-w-6xl min-w-2xs min-h-full rounded-2xl gap-6 justify-items-center grow">
      {pokemons.pokemons.sort().map((pokemon: Pokemon) => (
        <Link
          key={pokemon.id}
          to={`../pokemon/${pokemon.id}`}
          className={`group rounded-xl overflow-hidden flex flex-col flex-1 hover:-translate-y-2 transform transition-all duration-200 ease-in-out ${
            activeCard === pokemon.id ? "scale-95 shadow-2xl" : ""
          } hover:shadow-xl hover:bg-gray-300/50 dark:hover:bg-gray-700/50 dark:shadow-gray-200 dark:hover:shadow-md`}
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
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 dark:from-transparent dark:to-gray-200 group-hover:animate-shine" />
        </Link>
      ))}
    </div>
  );
}

export default FavoritesGrid;
