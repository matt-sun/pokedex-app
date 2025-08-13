import type {
  PokemonAPI,
  AbilitiesAPI,
  AbilityAPI,
  EffectAPI,
} from "@/lib/types";
import axiosClient from "@/lib/api/api";

const client = axiosClient();

async function getAbilitiesURLs(pokeData: PokemonAPI) {
  const pokeAbilitiesURLs: AbilitiesAPI[] = [];

  pokeData.abilities.map((item: AbilitiesAPI) => {
    const abilityInfo: AbilitiesAPI = {
      is_hidden: item.is_hidden,
      ability: {
        name: item.ability.name,
        url: item.ability.url,
      },
    };
    pokeAbilitiesURLs.push(abilityInfo);
  });
  return pokeAbilitiesURLs;
}

async function getAbilitiesData(pokeAbilitiesURLs: AbilitiesAPI[]) {
  const pokeAbilitiesList = await Promise.all(
    pokeAbilitiesURLs.map(async (item: AbilitiesAPI) => {
      const response = await client.get<AbilityAPI>(item.ability.url);
      return response.data;
    })
  );
  return pokeAbilitiesList;
}

async function mergeAbilitiesData(pokeAbilitiesList: AbilityAPI[]) {
  const pokeAbilitiesEffects: EffectAPI[][] = [];

  pokeAbilitiesList.map((arr) => {
    const effectPerLang: EffectAPI[] = [];
    arr.effect_entries.map((item) => {
      if (item.language?.name === "en") {
        const effectInfo: EffectAPI = {
          effect: item.effect,
          language: {
            name: item.language.name,
          },
          short_effect: item.short_effect,
        };
        effectPerLang.push(effectInfo);
      }
    });
    pokeAbilitiesEffects.push(effectPerLang);
  });
  return pokeAbilitiesEffects;
}

export { getAbilitiesURLs, getAbilitiesData, mergeAbilitiesData };
