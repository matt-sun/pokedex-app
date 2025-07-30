import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Layout from "@/components/layout/Layout";
import type { Pokemon } from "@/lib/types";
import { createContext } from "react";
import usePokemonData from "@/hooks/usePokemon";

interface PokemonContextType {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

const PokemonContext = createContext<PokemonContextType>({
  pokemons: [],
  isLoading: true,
  error: null,
});

function App() {
  const result = usePokemonData();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PokemonContext.Provider value={result}>
        <div>
          <Layout />
        </div>
      </PokemonContext.Provider>
    </ThemeProvider>
  );
}

export default App;

export { PokemonContext };
