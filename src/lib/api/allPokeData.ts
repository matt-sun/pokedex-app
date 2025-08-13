import type {
  AbilitiesAPI,
  Pokemon,
  PokemonAbilities,
  PokemonEvolutions,
  PokemonLocations,
  PokemonMoves,
  PokemonAPI,
  EffectAPI,
  LocationAreaAPI,
  MovesAPI,
  MoveAPI,
  MoveDescriptionAPI,
} from "@/lib/types";

async function mergeFullPokemonData(
  pokeData: PokemonAPI,
  pokeAbilitiesURLs: AbilitiesAPI[],
  pokeAbilitiesEffects: EffectAPI[][],
  pokeLocations: LocationAreaAPI[],
  pokeMoves: MovesAPI[],
  pokeMovesList: MoveAPI[],
  pokeMovesEffects: MoveDescriptionAPI[][],
  pokeChainLink: PokemonEvolutions[],
  pokeAdditionalData: {
    genderRate: number;
    growthRate: string;
    eggGroups: { name: string }[];
    isLegendary: boolean;
    isMythical: boolean;
  }
) {
  const pokemonDataAll: Pokemon = {
    name: pokeData.name,
    id: pokeData.id,
    sprites: {
      front: pokeData.sprites.other["official-artwork"].front_default,
      shiny: pokeData.sprites.other["official-artwork"].front_shiny || "",
    },
    types: {
      1: pokeData.types[0].type.name,
      2: pokeData.types[1]?.type.name,
    },
    stats: {
      hp: pokeData.stats[0].base_stat,
      attack: pokeData.stats[1].base_stat,
      defense: pokeData.stats[2].base_stat,
      speAtt: pokeData.stats[3].base_stat,
      speDef: pokeData.stats[4].base_stat,
      speed: pokeData.stats[5].base_stat,
    },
    abilities: pokeAbilitiesURLs.map((abil, abilIdx) => ({
      name: abil.ability.name,
      hidden: abil.is_hidden,
      effect: pokeAbilitiesEffects[abilIdx][0].effect,
      shortened: pokeAbilitiesEffects[abilIdx][0].short_effect,
    })) as PokemonAbilities[],
    locations: pokeLocations.map((_, locIdx) => ({
      name: pokeLocations[locIdx].location_area.name.replace(/-/g, " "),
    })) as PokemonLocations[],
    moves: pokeMoves.map((moves, movesIdx) => ({
      name: moves.move.name,
      description: pokeMovesEffects[movesIdx][0].flavor_text,
      effectChance: pokeMovesList[movesIdx].effect_chance || null,
      damageClass: pokeMovesList[movesIdx].damage_class.name,
      accuracy: pokeMovesList[movesIdx].accuracy,
      power: pokeMovesList[movesIdx].power,
      pp: pokeMovesList[movesIdx].pp,
      type: pokeMovesList[movesIdx].type.name,
    })) as PokemonMoves[],
    evolutions: pokeChainLink.map((link1) => ({
      name: link1.name,
      id: link1.id,
      sprite: link1.sprite,
      types: {
        1: link1.types[1],
        2: link1.types[2],
      },
      evolvesTo: link1.evolvesTo?.map((link2) => ({
        name: link2.name,
        id: link2.id,
        sprite: link2.sprite,
        types: {
          1: link2.types[1],
          2: link2.types[2],
        },
        evolvesTo: link2.evolvesTo?.map((link3) => ({
          name: link3.name,
          id: link3.id,
          sprite: link3.sprite,
          types: {
            1: link3.types[1],
            2: link3.types[2],
          },
        })),
      })),
    })) as PokemonEvolutions[],
    cries: pokeData.cries?.latest,
    height: pokeData.height / 10, // convert from dm to m
    weight: pokeData.weight / 10, // convert from hg to kg
    genderRate: (pokeAdditionalData.genderRate * 100) / 8,
    growthRate: pokeAdditionalData.growthRate,
    eggGroups: {
      1: pokeAdditionalData.eggGroups[0].name,
      2: pokeAdditionalData.eggGroups[1]?.name,
    },
    isLegendary: pokeAdditionalData.isLegendary,
    isMythical: pokeAdditionalData.isMythical,
  };
  return pokemonDataAll;
}

export default mergeFullPokemonData;
