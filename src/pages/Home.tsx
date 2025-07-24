import PokemonGrid from "@/components/pokemon/PokemonGrid";
import Paginate from "@/components/layout/Paginator";

function Home() {
  return (
    <div>
      <PokemonGrid />
      <Paginate />
    </div>
  );
}

export default Home;
