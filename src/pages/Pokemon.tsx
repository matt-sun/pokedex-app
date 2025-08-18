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
import {
  Volume2,
  ChevronRight,
  Venus,
  Mars,
  CircleOff,
  ChevronDown,
} from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "react-router-dom";
import { cn, getPokemonTypeStyles } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";
import { useState } from "react";

// Upon reload, we can have an error because the data is not cached.
// To fix this, I cache the data via IndexedDB.

function Pokemon() {
  const { id } = useParams();

  const { pokemon, isLoading, error } = useDetailedPokemonData(id ? id : "");

  const [spriteShiny, setSpriteShiny] = useState(false);

  const typeStyles = getPokemonTypeStyles(
    pokemon?.types?.[1],
    pokemon?.types?.[2]
  );

  const isBreakPointSmall = useMediaQuery("(min-width: 640px)");
  const isBreakPointExtraSmall = useMediaQuery("(min-width: 480px)");

  const handleClick = () => {
    setSpriteShiny(!spriteShiny);
  };

  if (error) {
    return <div className="text-center p-4">Error: {error}</div>;
  }

  if (isLoading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (pokemon) {
    return (
      <div className="grid grid-cols-4 grid-rows-[auto] mx-auto my-1 py-1 sm:my-2 sm:py-2 md:my-4 md:py-4 lg:w-[70%] lg:max-w-4xl max-w-3xl min-w-3xs gap-y-4 gap-x-4 justify-items-center">
        <div
          className={`col-span-4 row-span-2 grid grid-cols-subgrid grid-rows-subgrid gap-x-4 gap-y-0 content-start bg-linear-65 ${typeStyles.gradientLight1} ${typeStyles.gradientLight2} p-4 rounded-xl border-1 ${typeStyles.border} shadow-sm dark:shadow-gray-700`}
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <div className="col-start-1 row-start-1 justify-self-start">
            <Button
              variant="outline"
              size="icon"
              onClick={() => new Audio(pokemon.cries).play()}
              className={`cursor-pointer ${typeStyles.hoverBackground1} ${typeStyles.activeBackground1} shadow-md`}
            >
              <Volume2 strokeWidth={2.5} />
            </Button>
          </div>
          {isBreakPointSmall ? (
            <div className="col-start-2 row-start-1 col-span-2 row-span-1 grid grid-cols-subgrid">
              <h2 className="capitalize col-start-1 row-start-1 justify-self-end text-xl text-shadow-md">
                {pokemon.name}
              </h2>
              <h2 className="col-start-2 row-start-1 justify-self-start text-xl text-shadow-md">
                #{pokemon.id?.toString().padStart(5, "0")}
              </h2>
            </div>
          ) : (
            <div className="col-start-2 row-start-1 col-span-2 row-span-1 grid grid-cols-subgrid text-center">
              <h2 className="capitalize col-start-1 row-start-1 col-span-2 text-md xs:text-lg text-shadow-md pb-1">
                {pokemon.name}
                <br />#{pokemon.id?.toString().padStart(5, "0")}
              </h2>
            </div>
          )}

          <div className="col-start-4 row-start-1 justify-self-end">
            <FavoriteButton
              pokemonId={pokemon.id ? pokemon.id.toString() : ""}
              pokemon={pokemon}
            />
          </div>
          <div className="flex gap-2 col-start-2 row-start-2 col-span-2 justify-center xs:justify-self-center">
            <TypeBadge type={pokemon.types?.[1]} />
            <TypeBadge type={pokemon.types?.[2]} />
          </div>
        </div>

        <div
          className={
            "col-start-1 row-start-3 col-span-4 sm:col-span-2 row-span-1 h-full w-full group rounded-xl overflow-hidden relative shadow-lg hover:bg-gray-300/50 active:bg-gray-300 active:ring-gray-400/60 hover:dark:bg-gray-800 active:dark:bg-gray-700 dark:ring-1 dark:ring-gray-700 active:dark:ring-gray-500 active:ring-2"
          }
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <Button
            className="w-full h-full cursor-pointer"
            variant="ghost"
            onClick={handleClick}
          >
            <div
              className={cn(
                `transition-all duration-1000 transform-3d active:rotate-y-180 relative h-auto w-full`,
                spriteShiny && `rotate-y-180`
              )}
            >
              <img
                src={pokemon.sprites?.front}
                alt={pokemon.name}
                className="absolute backface-hidden h-50 xs:h-70 w-auto sm:w-100 sm:h-auto justify-self-center self-center"
              />
              <img
                src={pokemon.sprites?.shiny}
                alt={pokemon.name}
                className="absolute backface-hidden rotate-y-180 h-50 xs:h-70 w-auto sm:w-100 sm:h-auto justify-self-center self-center"
              />
              <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shine" />
            </div>
          </Button>
        </div>

        <div
          className="col-start-1 row-start-4 col-span-4 xs:col-span-3 sm:col-start-3 sm:row-start-3 sm:col-span-2 row-span-1 self-center h-auto w-full shadow-sm rounded-xl"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <StatChart
            hp={pokemon.stats?.hp}
            attack={pokemon.stats?.attack}
            defense={pokemon.stats?.defense}
            speAtt={pokemon.stats?.speAtt}
            speDef={pokemon.stats?.speDef}
            speed={pokemon.stats?.speed}
          />
        </div>

        {isBreakPointSmall ? (
          <div
            className="col-start-1 col-span-2 row-start-4 row-span-1 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-linear-65 from-blue-200 to-pink-200 border-purple-300/40 dark:bg-linear-45 dark:from-blue-600/20 dark:to-pink-600/20 dark:border-purple-600/20"
            style={{
              animation: "var(--animate-fade-in)",
              animationDelay: `${Math.random() * 0.5}s`,
              opacity: 0,
            }}
          >
            <div className="flex flex-col mx-4 py-4 justify-around h-full dark:drop-shadow-xs dark:drop-shadow-gray-700">
              {pokemon.genderRate !== -12.5 ? (
                <>
                  <div className="shadow-md rounded-full">
                    <Progress value={pokemon.genderRate} className="w-[100%]" />
                  </div>
                  <p>
                    <span className="text-pink-400 text-shadow-sm">
                      {pokemon.genderRate}% female
                    </span>{" "}
                    /{" "}
                    <span className="text-pokemon-blue text-shadow-sm">
                      {pokemon.genderRate ? 100 - pokemon.genderRate : 0}% male
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <div className="shadow-md rounded-full">
                    <Progress value={null} className="w-[100%] bg-gray-400" />
                  </div>
                  <p className="text-sm text-shadow-sm">Unknown Gender</p>
                </>
              )}
            </div>
          </div>
        ) : isBreakPointExtraSmall ? (
          <div
            className="col-start-4 col-span-1 row-start-4 row-span-1 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-linear-65 from-blue-200 to-pink-200 border-purple-300/40 dark:bg-linear-45 dark:from-blue-600/20 dark:to-pink-600/20 dark:border-purple-600/20"
            style={{
              animation: "var(--animate-fade-in)",
              animationDelay: `${Math.random() * 0.5}s`,
              opacity: 0,
            }}
          >
            <div className="flex mx-4 py-4 justify-around h-full dark:drop-shadow-xs dark:drop-shadow-gray-700">
              {pokemon.genderRate !== -12.5 ? (
                <>
                  <div className="shadow-md rounded-full">
                    <Progress value={pokemon.genderRate} className="h-[100%]" />
                  </div>
                  <div className="flex flex-col items-center justify-evenly">
                    <div className="text-pink-400 text-shadow-sm text-sm flex flex-col items-center">
                      <span>{pokemon.genderRate}%</span>
                      <Venus size={20} strokeWidth={3} />
                    </div>
                    <div>/</div>
                    <div className="text-pokemon-blue text-shadow-sm text-sm flex flex-col items-center">
                      <span>
                        {pokemon.genderRate ? 100 - pokemon.genderRate : 0}%
                      </span>
                      <Mars size={20} strokeWidth={3} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="shadow-md rounded-full">
                    <Progress value={null} className="h-[100%] bg-gray-400" />
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <CircleOff size={20} strokeWidth={3} color="gray" />
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div
            className="col-start-1 col-span-4 row-start-5 row-span-1 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-linear-65 from-blue-200 to-pink-200 border-purple-300/40 dark:bg-linear-45 dark:from-blue-600/20 dark:to-pink-600/20 dark:border-purple-600/20"
            style={{
              animation: "var(--animate-fade-in)",
              animationDelay: `${Math.random() * 0.5}s`,
              opacity: 0,
            }}
          >
            <div className="flex flex-col mx-4 py-4 justify-around h-full dark:drop-shadow-xs dark:drop-shadow-gray-700">
              {pokemon.genderRate !== -12.5 ? (
                <>
                  <div className="shadow-md rounded-full">
                    <Progress value={pokemon.genderRate} className="w-[100%]" />
                  </div>
                  <p>
                    <span className="text-pink-400 text-shadow-sm text-sm">
                      {pokemon.genderRate}% female
                    </span>{" "}
                    /{" "}
                    <span className="text-pokemon-blue text-shadow-sm text-sm">
                      {pokemon.genderRate ? 100 - pokemon.genderRate : 0}% male
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <div className="shadow-md rounded-full">
                    <Progress value={null} className="w-[100%] bg-gray-400" />
                  </div>
                  <p className="text-sm text-shadow-sm">Unknown Gender</p>
                </>
              )}
            </div>
          </div>
        )}

        <div
          className="col-start-1 col-span-2 row-start-6 xs:row-start-5 row-span-1 sm:col-start-3 sm:col-span-1 sm:row-start-4 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-gradient-to-r from-pokemon-fire/10 to-pokemon-fire/5 border-pokemon-fire/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <div className="flex flex-col mx-4 py-4 justify-around h-full text-sm xs:text-base">
            <p>H: {pokemon.height} m</p>
            <p>W: {pokemon.weight} kg</p>
          </div>
        </div>

        <div
          className="col-start-3 col-span-2 row-start-6 xs:row-start-5 row-span-1 sm:col-start-4 sm:col-span-1 sm:row-start-4 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-gradient-to-r from-pokemon-rock/10 to-pokemon-rock/5 border-pokemon-rock/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <div className="mx-4 my-4 capitalize text-sm xs:text-[1rem]">
            <h3>Growth:</h3>
            <p>{pokemon.growthRate}</p>
          </div>
        </div>

        <div
          className="col-start-1 col-span-2 row-start-7 xs:row-start-6 row-span-1 sm:col-start-1 sm:col-span-2 sm:row-start-5 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-gradient-to-r from-pokemon-psychic/10 to-pokemon-psychic/5 border-pokemon-psychic/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <div className="flex flex-col mx-4 py-4 justify-around h-full text-sm xs:text-[1rem]">
            <h3>Egg groups:</h3>
            <p className="capitalize">
              {pokemon.eggGroups?.[1]}{" "}
              {pokemon.eggGroups?.[2] ? ` / ${pokemon.eggGroups?.[2]}` : ""}{" "}
            </p>
          </div>
        </div>

        <div
          className="col-start-3 col-span-2 row-start-7 xs:row-start-6 row-span-1 sm:col-start-3 sm:col-span-2 sm:row-start-5 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-gradient-to-r from-pokemon-grass/10 to-pokemon-grass/5 border-pokemon-grass/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <div className="mx-4 my-4 capitalize text-sm xs:text-[1rem]">
            <p>Legendary: {pokemon.isLegendary ? "Yes" : "No"}</p>
            <p>Mythical: {pokemon.isMythical ? "Yes" : "No"}</p>
          </div>
        </div>

        <div
          className="row-start-8 xs:row-start-7 row-span-1 col-start-1 col-span-4 sm:row-start-6 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-gradient-to-r from-pokemon-electric/10 to-pokemon-electric/5 border-yellow-500/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <Accordion type="multiple" className="mx-4">
            <h3 className="mt-2 py-4 text-pokemon-blue dark:text-pokemon-gold text-sm xs:text-base">
              Abilities
            </h3>
            <div className="border-1 rounded-xl bg-pokemon-electric/30 border-pokemon-electric/50 mb-3 px-4">
              {pokemon.abilities?.map((ability, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="capitalize cursor-pointer text-gray-900 dark:text-gray-200 text-xs xs:text-sm">
                    {ability.hidden ? ability.name + " (Hidden)" : ability.name}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 dark:text-gray-300/80 text-xs xs:text-sm">
                    {ability.effect}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          </Accordion>
        </div>

        <div
          className="col-start-1 col-span-4 row-start-9 xs:row-start-8 sm:row-start-7 row-span-1 h-auto w-full border rounded-xl shadow-sm dark:shadow-gray-700 bg-gradient-to-r from-pokemon-fighting/10 to-pokemon-fighting/5 border-pokemon-fighting/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <Accordion type="multiple" className="mx-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="capitalize cursor-pointer text-sm xs:text-base mt-2 text-pokemon-blue dark:text-pokemon-gold">
                Encounter Locations
              </AccordionTrigger>
              <AccordionContent className="border-1 rounded-xl bg-pokemon-fighting/20 border-pokemon-fighting/30 mb-3 text-gray-900 dark:text-gray-200">
                {pokemon.locations && pokemon.locations.length > 0 ? (
                  pokemon.locations.map((location, index) => (
                    <div
                      key={index}
                      className="capitalize mt-3 mx-4 text-xs xs:text-sm"
                    >
                      {location.name}
                    </div>
                  ))
                ) : (
                  <div className="capitalize mt-3 mx-4 text-xs xs:text-sm">
                    Unknown
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div
          className="col-start-1 col-span-4 row-start-10 xs:row-start-9 sm:row-start-8 row-span-1 w-full border rounded-xl shadow-sm overflow-hidden dark:shadow-gray-700 bg-gradient-to-r from-pokemon-blue/10 to-pokemon-blue/5 border-pokemon-blue/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <Accordion type="multiple" className="mx-4">
            <AccordionItem value="item-1">
              <AccordionTrigger className="capitalize cursor-pointer text-sm xs:text-base mt-2 text-pokemon-blue dark:text-pokemon-gold">
                Moves
              </AccordionTrigger>
              <AccordionContent className="border-1 rounded-xl bg-pokemon-blue/20 border-pokemon-blue/30 mb-3 text-gray-900 dark:text-gray-200">
                <ScrollArea className="h-150 w-full">
                  <MovesTable
                    columns={columns}
                    data={pokemon.moves ? pokemon.moves : []}
                  />
                  <ScrollBar
                    orientation="vertical"
                    className="w-2 bg-gray-300 dark:bg-gray-700 opacity-50 rounded-2xl"
                  />
                  {isBreakPointSmall ? null : (
                    <ScrollBar
                      orientation="horizontal"
                      className="h-2 bg-gray-300 dark:bg-gray-700 opacity-50 rounded-2xl"
                    />
                  )}
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div
          className="col-start-1 col-span-4 row-start-11 xs:row-start-10 sm:row-start-9 row-span-1 h-auto w-full border rounded-xl shadow-sm overflow-hidden dark:shadow-gray-700 bg-gradient-to-r from-pokemon-steel/10 to-pokemon-steel/5 border-pokemon-steel/20"
          style={{
            animation: "var(--animate-fade-in)",
            animationDelay: `${Math.random() * 0.5}s`,
            opacity: 0,
          }}
        >
          <div className="mx-4 my-6">
            <h3 className="text-pokemon-blue dark:text-pokemon-gold text-sm xs:text-base">
              Evolutions:
            </h3>
            {!pokemon.evolutions?.[0].evolvesTo ||
            pokemon.evolutions[0].evolvesTo.length === 0 ? (
              <p className="text-xs xs:text-sm capitalize mt-3">
                This Pokémon does not evolve
              </p>
            ) : null}
            <div className="flex flex-col sm:flex-row pt-6 justify-center items-center">
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
                      className="max-w-50 w-full h-auto border-4 rounded-full border-gray-500/50 shadow-md hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-200 dark:hover:shadow-md transition-transform duration-200 ease-in-out"
                    />
                  </Link>

                  <div className="py-1 mt-2 text-xs xs:text-sm text-center">
                    {pokemon.evolutions?.[0].name} #
                    {pokemon.evolutions?.[0].id?.toString().padStart(5, "0")}
                  </div>
                  <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                    <TypeBadge type={pokemon.evolutions?.[0]?.types[1]} />
                    {pokemon.evolutions?.[0]?.types[2] && (
                      <TypeBadge type={pokemon.evolutions?.[0]?.types[2]} />
                    )}
                  </div>
                </div>
              </div>

              {!pokemon.evolutions?.[0].evolvesTo ||
              pokemon.evolutions[0].evolvesTo.length ===
                0 ? null : isBreakPointSmall ? (
                <ChevronRight className="w-10 h-10 shrink-0 text-pokemon-blue" />
              ) : (
                <ChevronDown className="w-10 h-10 shrink-0 text-pokemon-blue" />
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
                          className="max-w-50 w-full h-auto border-4 border-gray-500/50 shadow-md rounded-full hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-200 dark:hover:shadow-md transition-transform duration-200 ease-in-out"
                        />
                      </Link>
                      <div className="py-1 mt-2 text-xs xs:text-sm text-center">
                        {evolution.name} #
                        {evolution.id?.toString().padStart(5, "0")}
                      </div>
                      <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                        <TypeBadge type={evolution.types[1]} />
                        {evolution.types[2] && (
                          <TypeBadge type={evolution.types[2]} />
                        )}
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
                          className="max-w-50 w-full h-auto border-4 border-gray-500/50 shadow-md rounded-full hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-200 dark:hover:shadow-md transition-transform duration-200 ease-in-out"
                        />
                      </Link>
                      <div className="py-1 mt-2 text-xs xs:text-sm text-center">
                        {evolution.name} #
                        {evolution.id?.toString().padStart(5, "0")}
                      </div>
                      <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                        <TypeBadge type={evolution.types[1]} />
                        {evolution.types[2] && (
                          <TypeBadge type={evolution.types[2]} />
                        )}
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
              ) ? null : isBreakPointSmall ? (
                <ChevronRight className="w-10 h-10 shrink-0 text-pokemon-blue" />
              ) : (
                <ChevronDown className="w-10 h-10 shrink-0 text-pokemon-blue" />
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
                              className="max-w-50 w-full h-auto border-4 border-gray-500/50 shadow-md rounded-full hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-200 dark:hover:shadow-md transition-transform duration-200 ease-in-out"
                            />
                          </Link>
                          <div className="py-1 mt-2 text-xs xs:text-sm text-center">
                            {maxEvolution.name} #
                            {maxEvolution.id?.toString().padStart(5, "0")}
                          </div>
                          <div className="py-1 flex w-full flex-wrap gap-2 items-center justify-center">
                            <TypeBadge type={maxEvolution.types[1]} />
                            {maxEvolution.types[2] && (
                              <TypeBadge type={maxEvolution.types[2]} />
                            )}
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
