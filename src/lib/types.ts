// Custom Types

interface Pokemon {
  id?: number;
  name: string;
  sprites?: { front: string; shiny: string };
  types?: { 1: string; 2: string };
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    speAtt: number;
    speDef: number;
    speed: number;
  };
  abilities?: PokemonAbilities[];
  evolutions?: PokemonEvolutions[];
  locations?: PokemonLocations[];
  moves?: PokemonMoves[];
  cries?: string;
  genderRate?: number; // in 8ths, -1 means genderless
  growthRate?: string;
  eggGroups?: {
    // Types essentially
    1: string;
    2: string;
  };
  height?: number;
  weight?: number;
  isLegendary?: boolean;
  isMythical?: boolean;
}
// favorite: boolean;

interface PokemonAbilities {
  name: string;
  hidden?: boolean;
  effect?: string;
  shortened?: string;
}

interface PokemonEvolutions {
  name: string;
  id: number;
  sprite: string;
  types: { 1: string; 2?: string };
  evolvesTo?: PokemonEvolutions[];
}

interface PokemonLocations {
  name?: string;
}

interface PokemonMoves {
  name: string;
  description: string;
  effectChance: number;
  damageClass: string;
  accuracy: number;
  power: number;
  pp: number;
  type: string;
}

interface PokemonContextType {
  result: {
    pokemons: Pokemon[];
    isLoading: boolean;
    error: string | null;
  };
  setResult: React.Dispatch<
    React.SetStateAction<{
      pokemons: Pokemon[];
      isLoading: boolean;
      error: string | null;
    }>
  >;
}

interface IndexContextType {
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

// Pokedex API Responses

interface AllPokemonAPI {
  name: string;
  url: string;
}

interface AbilitiesAPI {
  is_hidden: boolean;
  ability: {
    name: string;
    url: string;
  };
}

interface AbilityAPI {
  effect_entries: EffectAPI[];
}

interface EffectAPI {
  effect?: string;
  language?: {
    name: string;
  };
  short_effect?: string;
}

interface LocationAreaAPI {
  location_area: {
    name: string;
  };
}

interface MovesAPI {
  move: { name: string; url: string };
}

interface MoveAPI {
  accuracy: number;
  power: number;
  pp: number;
  effect_chance: number | null;
  damage_class: {
    name: string;
  };
  type: {
    name: string;
  };
  flavor_text_entries: MoveDescriptionAPI[];
}

interface MoveDescriptionAPI {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface SpeciesAPI {
  evolution_chain: {
    url: string;
  };
  gender_rate: number; // in 8ths, -1 means genderless
  growth_rate: {
    name: string;
  };
  egg_groups: EggGroupsAPI[];
  is_legendary: boolean;
  is_mythical: boolean;
}

interface EggGroupsAPI {
  name: string;
}

interface EvolutionChainAPI {
  chain: {
    species: {
      name: string;
    };
    evolves_to?: ChainLinkAPI[];
  };
}

interface ChainLinkAPI {
  species: {
    name: string;
  };
  evolves_to?: ChainLinkAPI[];
}

interface StatsAPI {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

interface TypesAPI {
  type: { name: string; url: string };
}

interface PokemonAPI {
  id: number;
  name: string;
  abilities: AbilitiesAPI[];
  location_area_encounters: string;
  moves: MovesAPI[];
  species: {
    url: string;
  };
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: StatsAPI[];
  types: TypesAPI[];
  cries: {
    latest: string;
  };
  height: number; // in dm
  weight: number; // in hg
}

export type {
  Pokemon,
  PokemonAbilities,
  PokemonEvolutions,
  PokemonLocations,
  PokemonMoves,
  PokemonContextType,
  IndexContextType,
  AllPokemonAPI,
  AbilitiesAPI,
  AbilityAPI,
  EffectAPI,
  LocationAreaAPI,
  MovesAPI,
  MoveAPI,
  MoveDescriptionAPI,
  SpeciesAPI,
  EggGroupsAPI,
  EvolutionChainAPI,
  ChainLinkAPI,
  StatsAPI,
  TypesAPI,
  PokemonAPI,
};
