import TypeBadge from "@/components/pokemon/TypeBadge";
import FavoriteButton from "@/components/layout/FavoriteButton";
import StatChart from "@/components/pokemon/StatChart";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { PokemonContext } from "@/App";

// Upon reload, we have an error because the data is not cached.
// To fix this, either I reload the whole API or I cache the data.
// We will do the latter via IndexedDB

function Pokemon() {
  const { name } = useParams();
  const { pokemons, isLoading, error } = useContext(PokemonContext);

  if (error) {
    return <div className="text-center p-4">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const pokemon = pokemons.find(
    (item) => item.name.toLowerCase() === name?.toLowerCase()
  );

  if (pokemon) {
    return (
      <div className="grid grid-cols-4 grid-rows-[auto_1fr_1fr_auto] mx-auto w-6/10 max-w-5xl min-w-2xs gap-y-6 gap-x-4 justify-items-center">
        <div className="col-span-4 grid grid-cols-subgrid gap-4 content-start">
          <div className="capitalize col-span-2 justify-self-end">
            {pokemon.name}
          </div>
          <div className="justify-self-start">
            # {pokemon.id?.toString().padStart(4, "0")}
          </div>
          <div className="justify-self-end self-end">
            <FavoriteButton />
          </div>
        </div>
        <img
          src={pokemon.sprites?.front}
          alt={pokemon.name}
          className="w-100 h-auto col-span-2 row-span-2 justify-self-end self-center"
        />
        <div className="col-start-1 col-end-3 row-start-4 row-end-5 justify-self-start self-center h-auto w-full">
          <StatChart
            hp={pokemon.stats?.hp}
            attack={pokemon.stats?.attack}
            defense={pokemon.stats?.defense}
            speAtt={pokemon.stats?.speAtt}
            speDef={pokemon.stats?.speDef}
            speed={pokemon.stats?.speed}
          />
        </div>
        <div className="flex w-full flex-wrap gap-2 col-span-2 justify-self-center">
          <TypeBadge type={pokemon.types?.[1]} />
          <TypeBadge type={pokemon.types?.[2]} />
        </div>
        {/* Why do I call it as under the PokeAPI format and not the Pokemon object type format I defined? */}
        <div>{pokemon.abilities?.[0]?.name}</div>
        <div>{pokemon.abilities?.[0]?.hidden}</div>
        <div>{pokemon.abilities?.[0]?.effect}</div>
        <div>{pokemon.abilities?.[0]?.shortened}</div>
      </div>
    );
  }
}

export default Pokemon;
