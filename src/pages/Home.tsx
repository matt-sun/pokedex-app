import PokemonGrid from "@/components/pokemon/PokemonGrid";
import Paginate from "@/components/layout/Paginate";

function Home() {
  const totalPokemon = 1025; // Total number of Pokemon

  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-2xl text-center my-1 py-1 sm:my-2 sm:py-2 md:my-4 md:py-4 md:text-3xl">
        Pokédex
      </h1>
      <div className="flex-1">
        <PokemonGrid />
      </div>
      <div className="flex justify-center">
        <Paginate totalPokemon={totalPokemon} />
      </div>
    </div>
  );
}

export default Home;
