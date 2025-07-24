import PokemonCard from "@/components/pokemon/PokemonCard";
import API from "@/hooks/usePokemon";
import { Link } from "react-router-dom";

function PokemonGrid() {
  const pokemons = API();

  return (
    <div className="grid grid-cols-4 mx-auto w-8/10 max-w-5xl min-w-2xs rounded-2xl gap-4 justify-items-center">
      {pokemons.map((pokemon) => {
        return (
          <Link to={`pokemon/${pokemon.name}`}>
            <PokemonCard
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              spriteF={pokemon.spriteFront}
              spriteS={pokemon?.spriteShiny}
              type1={pokemon.type1}
              type2={pokemon?.type2}
              {...pokemons}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default PokemonGrid;