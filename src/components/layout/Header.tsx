import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import Logo from "./Logo";
import { ModeToggle } from "./ModeToggle";
import { Link } from "react-router-dom";
import {
  createDatabase,
  CachePokemonNames,
  getAllPokemonNames,
} from "@/lib/cache";
import { useState, useEffect } from "react";
import { getPokemonURLs } from "@/lib/api/mainPokeData";
import { useMediaQuery } from "@/lib/use-media-query";
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer";
import { MenuIcon, X } from "lucide-react";

function Header() {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const isDesktop = useMediaQuery("(min-width: 880px)");

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        await createDatabase();

        let results = await getAllPokemonNames();

        // If no cached names, fetch and cache them
        if (results.length === 0) {
          const pokeDataListURLs = await getPokemonURLs();
          await CachePokemonNames(pokeDataListURLs);
          results = await getAllPokemonNames();
        }

        setSuggestions(results.map((pokemon) => pokemon.name));
      } catch (error) {
        console.error("Failed to load suggestions:", error);
      }
    };
    getSuggestions();
  }, []);

  return (
    <header className="sticky top-0 z-50 pt-4 bg-gray-200 dark:bg-gray-900 text-white dark:text-gray-200">
      <div className="mx-4 bg-pokemon-boston-red dark:bg-red-900 p-4 rounded-2xl">
        {isDesktop ? (
          <nav className="grid grid-cols-3 center">
            <div className="flex items-center gap-3 justify-self-start">
              <Logo />
              <h1>
                <Link to={`/`} reloadDocument>
                  Pokedex App
                </Link>
              </h1>
            </div>

            <div className="items-center">
              <SearchBar suggestions={suggestions} />
            </div>
            <div className="items-center justify-self-end">
              <Button variant="link">
                <Link to={`favorites`}>Favorites</Link>
              </Button>
              <Button variant="link">
                <Link to={`about`}>About</Link>
              </Button>
              <ModeToggle />
            </div>
          </nav>
        ) : (
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-3 justify-self-start">
              <Logo />
              <h1>
                <Link to={`/`} reloadDocument>
                  Pokedex App
                </Link>
              </h1>
            </div>

            <div className="flex justify-self-end items-center">
              <Drawer direction="right">
                <DrawerTrigger className="cursor-pointer hover:bg-pokemon-red dark:hover:bg-pokemon-blue p-2 rounded-lg">
                  <MenuIcon />
                </DrawerTrigger>
                <DrawerContent className="bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200 flex flex-col font-pokemon min-w-[50%] 2xs:w-auto w-full">
                  <DrawerHeader className="flex justify-items-start p-4">
                    <DrawerClose>
                      <X
                        strokeWidth={2}
                        size={30}
                        className="cursor-pointer rounded-lg shadow-lg dark:shadow-gray-700 dark:shadow-sm bg-gray-300/70 dark:bg-gray-800 hover:bg-gray-400/50 dark:hover:bg-gray-700 active:bg-gray-400 dark:active:bg-gray-600"
                      />
                    </DrawerClose>
                  </DrawerHeader>

                  <div className="flex flex-col items-end justify-between pt-0 p-4">
                    <div className="p-3 mb-3 bg-pokemon-boston-red dark:bg-red-900 rounded-lg flex flex-col items-end w-full">
                      <Button variant="link" className="p-3">
                        <Link to={`favorites`}>Favorites</Link>
                      </Button>
                      <Button variant="link" className="py-3">
                        <Link to={`about`}>About</Link>
                      </Button>
                    </div>
                    <div className="p-3 bg-pokemon-boston-red dark:bg-red-900 rounded-lg w-full">
                      <SearchBar suggestions={suggestions} />
                    </div>
                  </div>

                  <DrawerFooter className="flex justify-items-end p-4">
                    <ModeToggle />
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
