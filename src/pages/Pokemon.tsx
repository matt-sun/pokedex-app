import TypeBadge from "@/components/pokemon/TypeBadge";
import FavoriteButton from "@/components/layout/FavoriteButton";
import StatChart from "@/components/pokemon/StatChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import { PokemonContext } from "@/App";

// Upon reload, we can have an error because the data is not cached.
// To fix this, I cache the data via IndexedDB.

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
      <div className="grid grid-cols-4 grid-rows-[auto_auto_1fr_auto_auto_auto] mx-auto w-6/10 max-w-5xl min-w-2xs gap-y-4 gap-x-4 justify-items-center">
        <div className="col-span-4 row-span-2 grid grid-cols-subgrid grid-rows-subgrid gap-x-4 gap-y-0 content-start">
          <h2 className="capitalize col-start-2 row-start-1 justify-self-end">
            {pokemon.name}
          </h2>
          <h2 className="col-start-3 row-start-1 justify-self-start">
            # {pokemon.id?.toString().padStart(4, "0")}
          </h2>
          <div className="col-start-4 row-start-1 justify-self-end self-end">
            <FavoriteButton />
          </div>
          <div className="flex gap-2 col-start-2 row-start-2 col-span-2 justify-self-center">
            <TypeBadge type={pokemon.types?.[1]} />
            <TypeBadge type={pokemon.types?.[2]} />
          </div>
        </div>

        <img
          src={pokemon.sprites?.front}
          alt={pokemon.name}
          className="w-100 h-auto col-start-1 row-start-3 col-span-2 row-span-1 justify-self-end self-center"
        />

        <div className="col-start-3 row-start-3 col-span-2 row-span-1 justify-self-start self-center h-auto w-full">
          <StatChart
            hp={pokemon.stats?.hp}
            attack={pokemon.stats?.attack}
            defense={pokemon.stats?.defense}
            speAtt={pokemon.stats?.speAtt}
            speDef={pokemon.stats?.speDef}
            speed={pokemon.stats?.speed}
          />
        </div>

        <div className="col-start-1 col-span-4 row-start-4 row-span-1 justify-self-start h-auto w-full border rounded-xl shadow-sm">
          <Accordion type="multiple" className="mx-4">
            <h3 className="mt-6 mb-2">Abilities</h3>
            {pokemon.abilities?.map((ability, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="capitalize">
                  {ability.hidden ? ability.name + " (Hidden)" : ability.name}
                </AccordionTrigger>
                <AccordionContent>{ability.effect}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="col-start-1 col-span-4 row-start-5 row-span-1 justify-self-start h-auto w-full border rounded-xl shadow-sm">
          <Accordion type="multiple" className="mx-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="capitalize text-base mt-2">
                Encounter Locations
              </AccordionTrigger>
              <AccordionContent>
                {pokemon.locations && pokemon.locations.length > 0 ? (
                  pokemon.locations.map((location, index) => (
                    <div className="text-sm capitalize mt-3" key={index}>
                      {location.name}
                    </div>
                  ))
                ) : (
                  <div className="text-sm capitalize mt-3">Unknown</div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/*         
        <ScrollArea className="col-start-1 col-span-4 row-start-5 row-span-1 justify-self-start h-32 w-full border rounded-xl shadow-sm">
          <div className="mx-4">
            <h3 className="my-6">Encounter Locations</h3>
            {pokemon.locations && pokemon.locations.length > 0 ? (
              pokemon.locations.map((location, index) => (
                <Fragment key={index}>
                  {" "}
                  <Separator className="my-4 bg-black" />
                  <div className="text-sm capitalize mb-4">{location.name}</div>
                </Fragment>
              ))
            ) : (
              <Fragment>
                <Separator className="my-4 bg-black" />
                <div className="text-sm capitalize mb-4">Unknown Location</div>
              </Fragment>
            )}
          </div>
        </ScrollArea> */}
      </div>
    );
  }
}

export default Pokemon;
