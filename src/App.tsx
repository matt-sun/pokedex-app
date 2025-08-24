import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Layout from "@/components/layout/Layout";
import { createContext, useState, useEffect } from "react";
import useMainPokemonData from "@/hooks/usePokemon";
import type { PokemonContextType, IndexContextType } from "@/lib/types";
import { useLocation } from "react-router-dom";

const PokemonContext = createContext<PokemonContextType>({
  result: {
    pokemons: [],
    isLoading: true,
    error: null,
  },
  setResult: () => {},
});

const IndexContext = createContext<IndexContextType>({
  startIndex: 0,
  setStartIndex: () => {},
  currentPage: 1,
  setCurrentPage: () => {},
});

function App() {
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();

  useEffect(() => {
    setStartIndex(0);
    setCurrentPage(1);
  }, [location.pathname]);

  // Use hook directly, not useState
  const result = useMainPokemonData(startIndex);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <PokemonContext.Provider value={{ result, setResult: () => {} }}>
        <IndexContext.Provider
          value={{ startIndex, setStartIndex, currentPage, setCurrentPage }}
        >
          <div>
            <Layout />
          </div>
        </IndexContext.Provider>
      </PokemonContext.Provider>
    </ThemeProvider>
  );
}

export default App;

export { PokemonContext, IndexContext };
