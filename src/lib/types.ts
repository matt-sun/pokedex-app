// Custom Types

interface Pokemon {
  id?: number;
  name: string;
  url: string;
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
  // favorite: boolean;
}

interface PokemonAbilities {
  name: string;
  hidden?: boolean;
  effect?: string;
  shortened?: string;
}

interface PokemonEvolutions {
  name: string;
  sprite: string;
}

interface PokemonLocations {
  name: string;
}

interface PokemonMoves {
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  type: string;
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

interface LocationAreasAPI {
  results: LocationAreaAPI[];
}

interface LocationAreaAPI {
  location_area: {
    url: string;
  };
}
//CHECK AGAIN
interface LocationAPI {
  names: {
    language: {
      name: string;
    };
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
  type: {
    name: string;
  };
}

interface SpeciesAPI {
  evolution_chain: {
    url: string;
  };
}

interface EvolutionChainAPI {
  baby_trigger_item: string;
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: ChainLinkAPI[];
  };
}

interface ChainLinkAPI {
  species: {
    name: string;
    url: string;
  };
  evolves_to: ChainLinkAPI[];
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
  abilities: AbilitiesAPI[];
  location_area_encounters: string;
  moves: MovesAPI[];
  species: {
    name: string;
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
}

export type {
  Pokemon,
  PokemonAbilities,
  PokemonEvolutions,
  PokemonLocations,
  PokemonMoves,
  AllPokemonAPI,
  AbilitiesAPI,
  AbilityAPI,
  EffectAPI,
  LocationAreasAPI,
  LocationAreaAPI,
  LocationAPI,
  MovesAPI,
  MoveAPI,
  SpeciesAPI,
  EvolutionChainAPI,
  ChainLinkAPI,
  StatsAPI,
  TypesAPI,
  PokemonAPI,
};
