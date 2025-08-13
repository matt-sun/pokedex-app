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

export default FavoritesGrid;
