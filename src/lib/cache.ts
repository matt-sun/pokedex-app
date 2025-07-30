import type { Pokemon } from "./types";

async function CachePokemonData(pokemonData: Pokemon[]) {
  if (!indexedDBSupport()) {
    console.error("IndexedDB is not supported in this browser.");
    return;
  }

  try {
    // Only initialize the database if it's not already initialized
    if (!db) {
      await createDatabase();
    }

    // Store the new data and update timestamp
    await removeAllPokemon();
    await addPokemons(pokemonData);
    await updateCacheTimestamp();
  } catch (error) {
    console.error("Error caching Pokemon data:", error);
  }
}

// Open IndexedDB to cache the Pokemon data.
// Stores the fetched Pokemon data and help us access the data even
// when offline without having to fetch it again.

function indexedDBSupport() {
  return "indexedDB" in window;
}

export let db: IDBDatabase | undefined;

async function createDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Increment version number for new schema with metadata store
    const request = window.indexedDB.open("PokedexDB", 1);

    request.onerror = (event) => {
      reject(
        `IndexedDB error: ${(event.target as IDBOpenDBRequest).error?.message}`
      );
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;

      try {
        // Create the pokemon store
        if (!database.objectStoreNames.contains("pokemons")) {
          database
            .createObjectStore("pokemons", {
              keyPath: "id",
            })
            .createIndex("id", "id", { unique: true });
        }

        // Create metadata store for cache info
        if (!database.objectStoreNames.contains("metadata")) {
          database.createObjectStore("metadata", {
            keyPath: "key",
          });
        }

        // Use the transaction from the event for completion handling
        const transaction = (event.target as IDBOpenDBRequest).transaction;
        if (transaction) {
          transaction.oncomplete = () => resolve();
        }
      } catch (error) {
        reject(new Error("Failed to create object store: " + error));
        return;
      }
    };

    request.onsuccess = () => {
      console.log("Successful database connection");
      db = request.result;
      resolve();
    };
  });
}

async function addPokemons(pokemonData: Pokemon[]): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction("pokemons", "readwrite");
    const objectStore = transaction.objectStore("pokemons");

    pokemonData.forEach((pokemon) => {
      objectStore.put(pokemon);
    });

    transaction.oncomplete = () => {
      console.log("All Pokemons have been added successfully.");
      resolve();
    };

    transaction.onerror = () => {
      reject(new Error("Failed to add Pokemons to database"));
    };
  });
}

async function getAllPokemon(): Promise<Pokemon[]> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("pokemons", "readonly")
      .objectStore("pokemons")
      .getAll();

    request.onsuccess = () => {
      const pokemons: Pokemon[] = request.result;
      // Sort by ID
      pokemons.sort((a, b) => (a.id || 0) - (b.id || 0));
      console.log("Got all the Pokemons in order");
      console.table(pokemons);
      resolve(pokemons);
    };

    request.onerror = (err) => {
      console.error(`Error getting all Pokemons:`, err);
      reject(err);
    };
  });
}

async function getPokemon(name: string): Promise<Pokemon> {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("pokemons", "readonly")
      .objectStore("pokemons")
      .get(name);

    request.onsuccess = () => {
      const pokemon: Pokemon = request.result;
      if (!pokemon) {
        reject(new Error(`Pokemon ${name} not found`));
        return;
      }
      resolve(pokemon);
    };

    request.onerror = (err) => {
      console.error(`Error getting Pokemon information:`, err);
      reject(err);
    };
  });
}

// async function updatePokemons(id: number): Promise<void> {
//   return new Promise((resolve, reject) => {
//     if (!db) {
//       reject(new Error("Database not initialized"));
//       return;
//     }

//     const transaction = db.transaction("pokemons", "readwrite");
//     const objectStore = transaction.objectStore("pokemons");
//     const request = objectStore.get(id);

//     request.onsuccess = () => {
//       const pokemon: Pokemon = request.result;
//       if (!pokemon) {
//         reject(new Error(`Pokemon with id ${id} not found`));
//         return;
//       }

//       // Note: We should update the Pokemon type to include the favorite property
//       pokemon.favorite = !pokemon.favorite;

//       const updateRequest = objectStore.put(pokemon);
//       updateRequest.onsuccess = () => {
//         console.log(
//           `Pokemon ${pokemon.name} favorite status updated successfully`
//         );
//         resolve();
//       };

//       updateRequest.onerror = (err) => {
//         console.error(`Error updating Pokemon:`, err);
//         reject(err);
//       };
//     };

//     request.onerror = (err) => {
//       console.error(`Error getting Pokemon:`, err);
//       reject(err);
//     };
//   });
// }

async function removeAllPokemon(): Promise<void> {
  if (!db) throw new Error("Database not initialized");

  const transaction = db.transaction("pokemons", "readwrite");
  const objectStore = transaction.objectStore("pokemons");

  return new Promise((resolve, reject) => {
    const request = objectStore.clear();

    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
}

// Cache management functions
async function updateCacheTimestamp(): Promise<void> {
  if (!db) throw new Error("Database not initialized");

  const transaction = db.transaction("metadata", "readwrite");
  const objectStore = transaction.objectStore("metadata");

  return new Promise((resolve, reject) => {
    const request = objectStore.put({
      key: "lastUpdated",
      timestamp: new Date().getTime(),
    });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function checkCacheValidity(): Promise<boolean> {
  if (!db) throw new Error("Database not initialized");

  const transaction = db.transaction("metadata", "readonly");
  const objectStore = transaction.objectStore("metadata");

  return new Promise((resolve) => {
    const request = objectStore.get("lastUpdated");

    request.onsuccess = () => {
      const data = request.result;
      if (!data) {
        resolve(false);
        return;
      }

      const now = new Date().getTime();
      const cacheAge = now - data.timestamp;
      const twoHours = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

      resolve(cacheAge < twoHours);
    };

    request.onerror = () => resolve(false);
  });
}

export default CachePokemonData;

export {
  indexedDBSupport,
  createDatabase,
  addPokemons,
  getAllPokemon,
  getPokemon,
  //   updatePokemons,
  removeAllPokemon,
  checkCacheValidity,
  updateCacheTimestamp,
};
