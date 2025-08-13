import TypeBadge from "@/components/pokemon/TypeBadge";
import FavoriteButton from "@/components/pokemon/FavoriteButton";
import StatChart from "@/components/pokemon/StatChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { columns } from "@/components/pokemon/MovesTableColumns";
import MovesTable from "@/components/pokemon/MovesTable";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import useDetailedPokemonData from "@/hooks/usePokemonDetails";
import { Volume2, ChevronRight } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";

// Upon reload, we can have an error because the data is not cached.
// To fix this, I cache the data via IndexedDB.

function Pokemon() {
  const { id } = useParams();

  const { pokemon, isLoading, error } = useDetailedPokemonData(id ? id : "");

  if (error) {
    return <div className="text-center p-4">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (pokemon) {
    return (
      <div className="grid grid-cols-4 grid-rows-[auto] mx-auto my-8 w-[70%] max-w-4xl min-w-3xs gap-y-4 gap-x-4 justify-items-center">
        <div className="col-span-4 row-span-2 grid grid-cols-subgrid grid-rows-subgrid gap-x-4 gap-y-0 content-start">
          <div className="col-start-1 row-start-1 justify-self-start">
            <Button
              variant="outline"
              onClick={() => new Audio(pokemon.cries).play()}
              className="cursor-pointer hover:bg-gray-300 active:bg-gray-400"
            >
              <Volume2 strokeWidth={2.5} />
            </Button>
          </div>
          <h2 className="capitalize col-start-2 row-start-1 justify-self-end">
            {pokemon.name}
          </h2>
          <h2 className="col-start-3 row-start-1 justify-self-start">
            #{pokemon.id?.toString().padStart(5, "0")}
          </h2>
          <div className="col-start-4 row-start-1 justify-self-end">
            <FavoriteButton
              pokemonId={pokemon.id ? pokemon.id.toString() : ""}
              pokemon={pokemon}
            />
          </div>
          <div className="flex gap-2 col-start-2 row-start-2 col-span-2 justify-self-center">
            <TypeBadge type={pokemon.types?.[1]} />
            <TypeBadge type={pokemon.types?.[2]} />
          </div>
        </div>

        <div className="col-start-1 row-start-3 col-span-2 row-span-1 h-auto w-full">
          <img
            src={pokemon.sprites?.front}
            alt={pokemon.name}
            className="w-100 h-auto justify-self-center self-center"
          />
        </div>

        <div className="col-start-3 row-start-3 col-span-2 row-span-1 self-center h-auto w-full">
          <StatChart
            hp={pokemon.stats?.hp}
            attack={pokemon.stats?.attack}
            defense={pokemon.stats?.defense}
            speAtt={pokemon.stats?.speAtt}
            speDef={pokemon.stats?.speDef}
            speed={pokemon.stats?.speed}
          />
        </div>

        <div className="col-start-1 col-span-2 row-start-4 row-span-1 h-auto w-full border rounded-xl shadow-sm">
          <div className="flex flex-col mx-4 py-4 justify-around h-full">
            {pokemon.genderRate !== -12.5 ? (
              <>
                <div>
                  <Progress value={pokemon.genderRate} className="w-[100%]" />
                </div>
                <p>
                  <span className="text-pink-400">
                    {pokemon.genderRate}% female
                  </span>{" "}
                  /{" "}
                  <span className="text-pokemon-blue">
                    {pokemon.genderRate ? 100 - pokemon.genderRate : 0}% male
                  </span>
                </p>
              </>
            ) : (
              <>
                <div>
                  <Progress value={null} className="w-[100%] bg-gray-400" />
                </div>
                <p>Unknown Gender</p>
              </>
            )}
          </div>
        </div>

        <div className="col-start-3 col-span-1 row-start-4 row-span-1 h-auto w-full border rounded-xl shadow-sm">
          <div className="flex flex-col mx-4 py-4 justify-around h-full">
            <p>H: {pokemon.height} m</p>
            <p>W: {pokemon.weight} kg</p>
          </div>
        </div>

        <div className="col-start-4 col-span-1 row-start-4 row-span-1 h-auto w-full border rounded-xl shadow-sm">
          <div className="mx-4 my-4 capitalize">
            <h3>Growth:</h3>
            <p>{pokemon.growthRate}</p>
          </div>
        </div>

        <div className="col-start-1 col-span-2 row-start-5 row-span-1 h-auto w-full border rounded-xl shadow-sm">
          <div className="flex flex-col mx-4 py-4 justify-around h-full">
            <h3>Egg groups:</h3>
            <p className="capitalize">
              {pokemon.eggGroups?.[1]}{" "}
              {pokemon.eggGroups?.[2] ? ` / ${pokemon.eggGroups?.[2]}` : ""}{" "}
            </p>
          </div>
        </div>

        <div className="col-start-3 col-span-2 row-start-5 row-span-1 h-auto w-full border rounded-xl shadow-sm">
          <div className="mx-4 my-4 capitalize">
            <p>Legendary: {pokemon.isLegendary ? "Yes" : "No"}</p>
            <p>Mythical: {pokemon.isMythical ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="col-start-1 col-span-4 row-start-6 row-span-1 h-auto w-full border rounded-xl shadow-sm">
          <Accordion type="multiple" className="mx-4">
            <h3 className="mt-6 mb-2">Abilities</h3>
            {pokemon.abilities?.map((ability, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="capitalize cursor-pointer">
                  {ability.hidden ? ability.name + " (Hidden)" : ability.name}
                </AccordionTrigger>
                <AccordionContent>{ability.effect}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="col-start-1 col-span-4 row-start-7 row-span-1 h-auto w-full border rounded-xl shadow-sm">
          <Accordion type="multiple" className="mx-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="capitalize cursor-pointer text-base mt-2">
                Encounter Locations
              </AccordionTrigger>
              <AccordionContent>
                {pokemon.locations && pokemon.locations.length > 0 ? (
                  pokemon.locations.map((location, index) => (
                    <div key={index} className="capitalize text-sm mt-3">
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

        <div className="col-start-1 col-span-4 row-start-8 row-span-1 w-full border rounded-xl shadow-sm overflow-hidden">
          <Accordion type="multiple" className="mx-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="capitalize cursor-pointer text-base mt-2">
                Moves
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-150 w-full">
                  <MovesTable
                    columns={columns}
                    data={pokemon.moves ? pokemon.moves : []}
                  />
                  <ScrollBar
                    orientation="vertical"
                    className="w-2 bg-gray-300 opacity-50 rounded-2xl"
                  />
                  <ScrollBar
                    orientation="horizontal"
                    className="h-2 bg-gray-300 opacity-50 rounded-2xl"
                  />
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="col-start-1 col-span-4 row-start-9 row-span-1 h-auto w-full border rounded-xl shadow-sm overflow-hidden">
          <div className="mx-4 my-6">
            <h3>Evolutions:</h3>
            {!pokemon.evolutions?.[0].evolvesTo ||
            pokemon.evolutions[0].evolvesTo.length === 0 ? (
              <p className="text-sm capitalize mt-3">
                This Pokémon does not evolve
              </p>
            ) : null}
            <div className="flex pt-6 justify-center items-center">
              <div className="flex flex-col">
                <div
                  key={pokemon.evolutions?.[0].id}
                  className="capitalize px-4 shrink-0 basis-1/3"
                >
                  <Link
                    key={pokemon.evolutions?.[0]?.id}
                    to={`/pokemon/${pokemon.evolutions?.[0].id}`}
                  >
                    <img
                      src={pokemon.evolutions?.[0].sprite}
                      alt={pokemon.evolutions?.[0].name}
                      className="max-w-50 w-full h-auto border-4 border-double rounded-full"
                    />
                  </Link>

                  <div className="py-1 mt-2 text-sm text-center">
                    {pokemon.evolutions?.[0].name} #
                    {pokemon.evolutions?.[0].id?.toString().padStart(5, "0")}
                  </div>
                  <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                    <TypeBadge type={pokemon.evolutions?.[0]?.types[1]} />
                    <TypeBadge type={pokemon.evolutions?.[0]?.types[2]} />
                  </div>
                </div>
              </div>

              {!pokemon.evolutions?.[0].evolvesTo ||
              pokemon.evolutions[0].evolvesTo.length === 0 ? null : (
                <ChevronRight className="w-10 h-10 shrink-0" />
              )}

              {!pokemon.evolutions?.[0].evolvesTo ||
              pokemon.evolutions[0].evolvesTo.length === 0 ? null : pokemon
                  .evolutions[0].evolvesTo.length < 3 ? (
                <div className="flex flex-col">
                  {pokemon.evolutions[0].evolvesTo.map((evolution) => (
                    <div
                      key={evolution.id}
                      className="capitalize px-4 py-2 shrink-0 basis-1/3"
                    >
                      <Link key={evolution.id} to={`/pokemon/${evolution.id}`}>
                        <img
                          src={evolution.sprite}
                          alt={evolution.name}
                          className="max-w-50 w-full h-auto border-4 border-double rounded-full"
                        />
                      </Link>
                      <div className="py-1 mt-2 text-sm text-center">
                        {evolution.name} #
                        {evolution.id?.toString().padStart(5, "0")}
                      </div>
                      <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                        <TypeBadge type={evolution.types[1]} />
                        <TypeBadge type={evolution.types[2]} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap">
                  {pokemon.evolutions[0].evolvesTo.map((evolution) => (
                    <div
                      key={evolution.id}
                      className="capitalize px-4 py-2 shrink grow basis-1/4"
                    >
                      <Link key={evolution.id} to={`/pokemon/${evolution.id}`}>
                        <img
                          src={evolution.sprite}
                          alt={evolution.name}
                          className="max-w-50 w-full h-auto border-4 border-double rounded-full"
                        />
                      </Link>
                      <div className="py-1 mt-2 text-sm text-center">
                        {evolution.name} #
                        {evolution.id?.toString().padStart(5, "0")}
                      </div>
                      <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                        <TypeBadge type={evolution.types[1]} />
                        <TypeBadge type={evolution.types[2]} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!pokemon.evolutions?.[0].evolvesTo ||
              pokemon.evolutions[0].evolvesTo.length === 0 ||
              !pokemon.evolutions[0].evolvesTo.some(
                (evolution) =>
                  evolution.evolvesTo && evolution.evolvesTo.length > 0
              ) ? null : (
                <ChevronRight className="w-10 h-10 shrink-0" />
              )}

              {!pokemon.evolutions?.[0].evolvesTo ||
              pokemon.evolutions[0].evolvesTo.length === 0 ||
              !pokemon.evolutions[0].evolvesTo.some(
                (evolution) =>
                  evolution.evolvesTo && evolution.evolvesTo.length > 0
              ) ? null : (
                <div className="flex flex-col">
                  {pokemon.evolutions[0].evolvesTo?.map((evolution) => (
                    <div key={`${evolution.id}-max`}>
                      {evolution.evolvesTo?.map((maxEvolution) => (
                        <div
                          key={maxEvolution.id}
                          className="capitalize px-4 py-2 shrink-0 basis-1/3"
                        >
                          <Link
                            key={maxEvolution.id}
                            to={`/pokemon/${maxEvolution.id}`}
                          >
                            <img
                              src={maxEvolution.sprite}
                              alt={maxEvolution.name}
                              className="max-w-50 w-full h-auto border-4 border-double rounded-full"
                            />
                          </Link>
                          <div className="py-1 mt-2 text-sm text-center">
                            {maxEvolution.name} #
                            {maxEvolution.id?.toString().padStart(5, "0")}
                          </div>
                          <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                            <TypeBadge type={maxEvolution.types[1]} />
                            <TypeBadge type={maxEvolution.types[2]} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
