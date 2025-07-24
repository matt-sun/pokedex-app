import { useLoaderData } from "react-router-dom";
import type { LoaderFunctionArgs } from "react-router-dom";
import TypeBadge from "@/components/pokemon/TypeBadge";
import FavoriteButton from "@/components/layout/FavoriteButton";
import StatChart from "@/components/pokemon/StatChart";

export async function Loader({ params }: LoaderFunctionArgs) {
  // Fetch the pokemon data by name from params from the PokeAPI
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`
  );
  if (!response.ok) {
    throw new Response("Not Found", { status: 404 });
  }
  const pokemon = await response.json();

  return { pokemon };
}

function Pokemon() {
  const { pokemon } = useLoaderData();
  console.log(pokemon);

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_1fr_1fr_auto] mx-auto w-6/10 max-w-5xl min-w-2xs gap-y-6 gap-x-4 justify-items-center">
      <div className="col-span-4 grid grid-cols-subgrid gap-4 content-start">
        <div className="capitalize col-span-2 justify-self-end">
          {pokemon.name}
        </div>
        <div className="justify-self-start">
          # {pokemon.id.toString().padStart(4, "0")}
        </div>
        <div className="justify-self-end self-end">
          <FavoriteButton />
        </div>
      </div>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-100 h-auto col-span-2 row-span-2 justify-self-end self-center"
      />
      <div className="col-start-1 col-end-3 row-start-4 row-end-5 justify-self-start self-center h-auto w-full">
        <StatChart
          hp={pokemon.stats[0].base_stat}
          attack={pokemon.stats[1].base_stat}
          defense={pokemon.stats[2].base_stat}
          speAtt={pokemon.stats[3].base_stat}
          speDef={pokemon.stats[4].base_stat}
          speed={pokemon.stats[5].base_stat}
        />
      </div>
      <div className="flex w-full flex-wrap gap-2 col-span-2 justify-self-center">
        <TypeBadge type={pokemon.types[0].type.name} />
        <TypeBadge type={pokemon.types[1]?.type.name} />
      </div>
    </div>
  );
}

export default Pokemon;
