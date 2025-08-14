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

function Header() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

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
      </div>
    </header>
  );
}

export default Header;
