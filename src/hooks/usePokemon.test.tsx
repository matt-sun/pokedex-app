import useMainPokemonData from "@/hooks/usePokemon";
import { renderHook, waitFor } from "@testing-library/react";
import "fake-indexeddb/auto";

// Import the mocked modules so we can manipulate them
import * as apiModule from "@/lib/api/mainPokeData";

jest.mock("@/lib/cache", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined), // This is CachePokemonData as default export
  createDatabase: jest.fn().mockResolvedValue(undefined),
  checkCacheValidity: jest.fn().mockResolvedValue(null),
  getAllPokemon: jest.fn().mockResolvedValue([]),
  updateCacheTimestamp: jest.fn().mockResolvedValue(undefined),
  db: undefined,
}));

jest.mock("@/lib/api/mainPokeData", () => ({
  getPokemonURLs: jest
    .fn()
    .mockResolvedValue([
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    ]),
  getListPokemonData: jest.fn().mockResolvedValue({
    id: 1,
    name: "Bulbasaur",
    abilities: [
      {
        ability: {
          name: "overgrow",
          url: "https://pokeapi.co/api/v2/ability/65/",
        },
        is_hidden: false,
      },
    ],
    location_area_encounters: "https://pokeapi.co/api/v2/pokemon/1/encounters",
    moves: [
      {
        moves: {
          name: "swords-dance",
          url: "https://pokeapi.co/api/v2/move/13/",
        },
      },
    ],
    species: { url: "https://pokeapi.co/api/v2/pokemon-species/1/" },
    sprites: {
      other: {
        "official-artwork": {
          front_default:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          front_shiny:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
        },
      },
    },
    stats: [
      {
        base_stat: 45,
        stat: { name: "hp", url: "https://pokeapi.co/api/v2/stat/1/" },
      },
    ],
    types: [
      {
        type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
      },
      {
        type: { name: "poison", url: "https://pokeapi.co/api/v2/type/4/" },
      },
    ],
    cries: {
      latest:
        "https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg",
    },
    height: 7,
    weight: 69,
  }),
  mergeMainPokemonData: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: "Bulbasaur",
      sprites: {
        front:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
      },
      types: {
        1: "grass",
        2: "poison",
      },
    },
  ]),
}));

// Cast to jest mocks for TypeScript
const mockedApiModule = apiModule as jest.Mocked<typeof apiModule>;

describe("useMainPokemonData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data correctly", async () => {
    const { result } = renderHook(() => useMainPokemonData(0));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemons).toHaveLength(1);
    expect(result.current.pokemons[0]).toMatchObject({
      id: 1,
      name: "Bulbasaur",
      sprites: {
        front:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png",
      },
      types: {
        1: "grass",
        2: "poison",
      },
    });
    expect(result.current.error).toBeNull();
  });

  it("handles API errors correctly", async () => {
    const mockError = new Error("Failed to fetch data");

    // Override the mock for this specific test
    mockedApiModule.getPokemonURLs.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useMainPokemonData(0));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toContain("Failed to fetch data");
    expect(result.current.pokemons).toEqual([]);
  });

  it("handles network errors correctly", async () => {
    const networkError = new Error("Network request failed");

    // Override the mock for this specific test
    mockedApiModule.getListPokemonData.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useMainPokemonData(0));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toContain("Network request failed");
    expect(result.current.pokemons).toEqual([]);
  });

  it("handles empty results correctly", async () => {
    // Override the mock for this specific test
    mockedApiModule.getPokemonURLs.mockResolvedValueOnce([]);

    // Make sure mergeMainPokemonData returns empty array when no results
    mockedApiModule.mergeMainPokemonData.mockResolvedValueOnce([]);

    const { result } = renderHook(() => useMainPokemonData(0));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.pokemons).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
