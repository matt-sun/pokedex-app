import type { LocationAreaAPI, PokemonAPI } from "@/lib/types";
import axiosClient from "@/lib/api/api";

const client = axiosClient();

async function getLocationsData(pokeData: PokemonAPI) {
  const pokeLocationsURL = await client.get<LocationAreaAPI[]>(
    pokeData.location_area_encounters
  );
  const pokeLocations = pokeLocationsURL.data;
  return pokeLocations;
}

export default getLocationsData;
