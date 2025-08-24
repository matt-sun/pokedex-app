import FavoritesGrid from "@/components/pokemon/FavoritesGrid";
import Paginate from "@/components/layout/Paginate";
import { Button } from "@/components/ui/button";
import { getAllFavoritePokemon, removeAllFavoritePokemon } from "@/lib/cache";
import { useEffect, useState } from "react";

function Favorites() {
  const [totalPokemon, setTotalPokemon] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllFavoritePokemon();
      setTotalPokemon(data.length);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-2xl text-center mt-0 sm:mt-2 py-2 md:mt-4 md:py-4 md:text-3xl">
        Favorites
      </h1>
      {totalPokemon === 0 ? (
        <p className="text-center text-gray-500">No favorites yet</p>
      ) : (
        <Button
          variant="destructive"
          className="mx-auto mb-4 cursor-pointer bg-pokemon-boston-red focus:ring-4 focus:outline-none focus:ring-pokemon-red hover:bg-pokemon-red active:bg-red-400"
          onClick={() => {
            removeAllFavoritePokemon();
            handleClick();
          }}
        >
          Clear All
        </Button>
      )}

      <div className="flex-1">
        <FavoritesGrid />
      </div>
      <div className="flex justify-center">
        <Paginate totalPokemon={totalPokemon} />
      </div>
    </div>
  );
}

function handleClick() {
  window.location.reload();
}

export default Favorites;
