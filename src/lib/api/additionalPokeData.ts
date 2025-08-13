import type { PokemonAPI } from "@/lib/types";
import { getSpeciesURLs } from "@/lib/api/evolutionsPokeData";

async function getAdditionalPokeData(pokeData: PokemonAPI) {
  const pokeSpecies = await getSpeciesURLs(pokeData);

  const pokeAdditionalData = {
    genderRate: pokeSpecies.gender_rate,
    growthRate: pokeSpecies.growth_rate.name,
    eggGroups: pokeSpecies.egg_groups.map((group) => ({
      name: group.name,
    })),
    isLegendary: pokeSpecies.is_legendary,
    isMythical: pokeSpecies.is_mythical,
  };

  return pokeAdditionalData;
}

export default getAdditionalPokeData;
