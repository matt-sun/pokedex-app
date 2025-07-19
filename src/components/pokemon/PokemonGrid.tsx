import PokemonCard from "@/components/pokemon/PokemonCard";

function PokemonGrid() {
  return (
    <div className="grid grid-cols-4 mx-auto w-8/10 max-w-5xl min-w-2xs rounded-2xl gap-4 justify-items-center">
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
      <PokemonCard />
    </div>
  );
}

export default PokemonGrid;
