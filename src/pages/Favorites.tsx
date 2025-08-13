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
      <h1 className="text-3xl text-center mt-4 py-4">Favorites</h1>
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
      <div className="flex-1">
        <FavoritesGrid />
      </div>
      <Paginate totalPokemon={totalPokemon} />
    </div>
  );
}

function handleClick() {
  window.location.reload();
}

export default Favorites;
