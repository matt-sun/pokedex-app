import { Button } from "@/components/ui/button";
import { Form, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  getPokemonURLByName,
  getPokemonURLByID,
} from "@/lib/api/indivPokeData";
import { TriangleAlert } from "lucide-react";

function SearchBar({ suggestions }: { suggestions: string[] }) {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string | number>("");
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [originalInput, setOriginalInput] = useState<string | number>(""); // Store user's original input
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const isNavigatingRef = useRef(false); // Flag to prevent debounce during navigation
  const resultContainer = useRef<HTMLLIElement>(null);
  const ref = useRef<HTMLUListElement>(null);
  const refError = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      // If the suggestions are open and the clicked target is not within the suggestions,
      // then close the suggestions
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const checkIfClickedOutside2 = (event: MouseEvent) => {
      // If the error is open and the clicked target is not within the error,
      // then close the error
      if (
        error &&
        refError.current &&
        !refError.current.contains(event.target as Node)
      ) {
        setError("");
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside2);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside2);
    };
  }, [error]);

  useEffect(() => {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: "nearest",
    });
  }, [focusedIndex]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const searchValue = inputValue.toString().trim().toLowerCase();

    // Validation
    if (!searchValue) {
      setError("Please enter a Pokemon name or number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const pokeData =
        typeof inputValue === "string"
          ? await getPokemonURLByName(searchValue)
          : await getPokemonURLByID(searchValue);
      const pokemonId = pokeData.id;

      if (pokemonId) {
        navigate(`/pokemon/${pokemonId}`);
        setFilteredSuggestions([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setError("Pokemon not found. Please check name or #.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
    setOriginalInput(inputValue);
    setFocusedIndex(null);
    isNavigatingRef.current = false; // Reset the navigation flag

    // Filter suggestions based on input value
    if (inputValue.length === 0) {
      setFilteredSuggestions([]);
      return;
    }
  };

  useEffect(() => {
    if (inputValue.toString().length === 0 || isNavigatingRef.current) return;

    const timeoutId = setTimeout(() => {
      const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(inputValue.toString().toLowerCase())
      );
      setFilteredSuggestions(filteredSuggestions);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, suggestions]);

  const handleSelect = (value: string | undefined) => {
    setInputValue(value ? value : "");
    setFilteredSuggestions([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.target as HTMLInputElement).value.length === 0) {
      setFocusedIndex(null);
      return;
    }

    if (event.key === "Backspace") {
      setFocusedIndex(0);
      return;
    }

    if (event.key === "Enter") {
      if (focusedIndex !== null && filteredSuggestions[focusedIndex]) {
        setInputValue(filteredSuggestions[focusedIndex]);
        setFilteredSuggestions([]);
        setIsOpen(false);
        // Let the form submission handle the navigation
      }
    }

    if (event.key === "ArrowDown") {
      // increment the index by 1 and set the input value to the name of the pokemon at that index
      let newIndex = focusedIndex !== null ? focusedIndex + 1 : 0;
      if (newIndex >= filteredSuggestions.length) {
        newIndex = 0; // Reset to the first suggestion if we go past the last one
      }
      isNavigatingRef.current = true; // Set flag before updating input
      setFocusedIndex(newIndex);
      setInputValue(filteredSuggestions[newIndex]);
    }

    if (event.key === "ArrowUp") {
      // decrement the index by 1 and set the input value to the name of the pokemon at that index
      event.preventDefault(); // Prevents the cursor from moving to the beginning of the input
      let newIndex =
        focusedIndex !== null
          ? focusedIndex - 1
          : filteredSuggestions.length - 1;
      if (newIndex < 0) {
        newIndex = filteredSuggestions.length - 1; // Reset to the last suggestion if we go past the first one
      }
      isNavigatingRef.current = true; // Set flag before updating input
      setFocusedIndex(newIndex);
      setInputValue(filteredSuggestions[newIndex]);
    }

    if (event.key === "Escape") {
      setInputValue(originalInput);
      setFilteredSuggestions([]);
      isNavigatingRef.current = false; // Reset the navigation flag
    }
    return;
  };

  return (
    <div>
      <Form
        className="flex items-center max-w-sm mx-auto"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="
    M10 1
    A9 9 0 0 1 19 10
    H11.5
    A1.5 1.5 0 1 0 8.5 10
    H1
    A9 9 0 0 1 10 1
    Z
    M10 19
    A9 9 0 0 1 1 10
    H8.5
    A1.5 1.5 0 1 0 11.5 10
    H19
    A9 9 0 0 1 10 19
    Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            className="capitalize border text-sm rounded-lg bg-gray-200 border-gray-300 text-gray-900 focus:ring-pokemon-red focus:border-pokemon-red block w-full ps-10 p-2.5 dark:bg-gray-900 dark:border-gray-200 dark:placeholder-gray-500 dark:text-gray-200 dark:focus:ring-pokemon-blue dark:focus:border-pokemon-blue"
            placeholder="Name or number..."
            required
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
            disabled={isLoading}
          />
          {/* Error message display */}
          {error && (
            <div
              ref={refError}
              className="flex items-center absolute p-2 w-full z-2000 text-sm mt-1 text-pokemon-boston-red dark:text-pokemon-blue bg-gray-200 dark:bg-gray-900 rounded-lg shadow-xl dark:shadow-md dark:shadow-gray-600 border-1 border-gray-600 dark:border-gray-200"
            >
              <TriangleAlert className="mr-2 w-12" strokeWidth={2} />
              <div className="w-fit">{error}</div>
            </div>
          )}
          {isOpen && filteredSuggestions.length > 0 && (
            <ul
              className="absolute max-h-100 overflow-auto top-full left-0 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:shadow-md dark:shadow-gray-500 border-0 border-t-0 rounded-md shadow-xl list-none z-1000 w-full"
              ref={ref}
            >
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="capitalize text-sm px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500"
                  onClick={() => handleSelect(suggestion)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  onMouseLeave={() => setFocusedIndex(null)}
                  ref={index === focusedIndex ? resultContainer : null}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          variant="default"
          size="icon"
          className="cursor-pointer p-2.5 ms-2 text-sm font-medium text-white bg-pokemon-blue rounded-lg border border-pokemon-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 dark:bg-pokemon-blue dark:hover:bg-blue-800 dark:focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          )}
          <span className="sr-only">Search</span>
        </Button>
      </Form>
    </div>
  );
}

export default SearchBar;
