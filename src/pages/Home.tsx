import PokemonGrid from "@/components/pokemon/PokemonGrid";
import Paginate from "@/components/layout/Paginate";

function Home() {
  const totalPokemon = 1025; // Total number of Pokemon

  return (
    <div className="flex flex-col flex-1">
      <h1 className="text-3xl text-center my-4 py-4">Pokédex</h1>
      <div className="flex-1">
        <PokemonGrid />
      </div>
      <Paginate totalPokemon={totalPokemon} />
    </div>
  );
}

export default Home;
