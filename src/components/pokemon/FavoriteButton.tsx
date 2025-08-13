import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import {
  addFavoritePokemon,
  getFavoritePokemon,
  removeFavoritePokemon,
} from "@/lib/cache";
import type { Pokemon } from "@/lib/types";

interface Props {
  pokemonId: string;
  pokemon: Pokemon;
}

function FavoriteButton({ pokemonId, pokemon }: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const favoritePokemon = await getFavoritePokemon(pokemonId);
        setIsFavorite(!!favoritePokemon);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };
    checkFavoriteStatus();
  }, [pokemonId]);

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeFavoritePokemon(pokemonId);
        setIsFavorite(false);
      } else {
        await addFavoritePokemon(pokemon);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-favorite-button>
      <Button
        type="button"
        variant="default"
        size="icon"
        onClick={handleClick}
        disabled={isLoading}
        className={`cursor-pointer focus:ring-4 focus:outline-none focus:ring-red-400 hover:bg-pokemon-red active:bg-pokemon-boston-red ${
          isFavorite ? "bg-pokemon-boston-red" : "bg-red-400"
        }`}
      >
        <Heart strokeWidth={3} fill={isFavorite ? "black" : "none"} />
      </Button>
    </div>
  );
}

export default FavoriteButton;
