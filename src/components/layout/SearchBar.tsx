import { Button } from "@/components/ui/button";

function SearchBar() {
  return (
    <div>
      <form className="flex items-center max-w-sm mx-auto">
        <label htmlFor="simple-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-black dark:text-white"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pokemon-blue focus:border-pokemon-blue block w-full ps-10 p-2.5  dark:bg-gray-300 dark:border-gray-400 dark:placeholder-gray-500 dark:text-white dark:focus:ring-pokemon-blue dark:focus:border-pokemon-blue"
            placeholder="Enter Pokemon name..."
            required
          />
        </div>
        <Button
          type="submit"
          variant="default"
          size="icon"
          className="p-2.5 ms-2 text-sm font-medium text-white bg-amber-300 rounded-lg border border-pokemon-blue hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-400 dark:bg-pokemon-blue dark:hover:bg-blue-800 dark:focus:ring-blue-800"
        >
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
          <span className="sr-only">Search</span>
        </Button>
      </form>
    </div>
  );
}
export default SearchBar;
