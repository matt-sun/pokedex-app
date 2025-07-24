interface Pokemon {
  id: number;
  name: string;
  url: string;
  spriteFront: string;
  spriteShiny?: string;
  type1: string;
  type2?: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speAtt: number;
    speDef: number;
    speed: number;
  };
}

//   ability: string; //Expand to show desc
//   abilitiyDesc: string;
//   move: string;
//   movePwr: number;
//   moveAcc: number;
//   moveType: string;
//   species: string; // We need to get the species from this endpoint: https://pokeapi.co/api/v2/pokemon-species/{id or name}/
//   // Then we can get the evolution chain url from which we can extract the id https://pokeapi.co/api/v2/evolution-chain/2/
//   evolution: string; // We use the id from right above to get the Evolution Chain.
//   // Read doc to figure out how to get the ID the pokemon part of the evolution Chain
//   location: string; // If applicable. This requires a specific endpoint https://pokeapi.co/api/v2/pokemon/{id or name}/encounters

export type { Pokemon };
