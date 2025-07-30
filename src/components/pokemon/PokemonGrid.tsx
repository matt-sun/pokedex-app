import { useContext } from "react";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { Link } from "react-router-dom";
import { PokemonContext } from "@/App";
import type { Pokemon } from "@/lib/types";

function PokemonGrid() {
  const { pokemons, isLoading, error } = useContext(PokemonContext);

  // console.log("PokemonGrid render:", { pokemons, isLoading, error });

  if (error) {
    return <div className="text-center p-4">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 mx-auto w-8/10 max-w-5xl min-w-2xs rounded-2xl gap-4 justify-items-center">
      {pokemons.sort().map((pokemon: Pokemon) => (
        <Link key={pokemon.id} to={`pokemon/${pokemon.name}`}>
          <PokemonCard
            id={pokemon.id}
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

export default PokemonGrid;
