import type { Pokemon, AllPokemonAPI } from "./types";

export let db: IDBDatabase | undefined;
let dbInitializationPromise: Promise<void> | null = null;

async function CachePokemonData(pokemonData: Pokemon[] | Pokemon) {
  if (!indexedDBSupport()) {
    console.error("IndexedDB is not supported in this browser.");
    return;
  }

  try {
    // Only initialize the database if it's not already initialized
    await ensureDatabaseInitialized();

    // Store the new data and update timestamp
    if (typeof pokemonData === "object" && !Array.isArray(pokemonData)) {
      await addPokemon(pokemonData);
    } else {
      await addPokemons(pokemonData);
    }
    await updateCacheTimestamp();
  } catch (error) {
    console.error("Error caching Pokemon data:", error);
  }
}

async function CacheDetailedPokemonData(pokemonData: Pokemon) {
  if (!indexedDBSupport()) {
    console.error("IndexedDB is not supported in this browser.");
    return;
  }

  try {
    // Only initialize the database if it's not already initialized
    await ensureDatabaseInitialized();

    // Store the detailed data and update timestamp
    await addDetailedPokemon(pokemonData);
    await updateCacheTimestamp();
  } catch (error) {
    console.error("Error caching detailed Pokemon data:", error);
  }
}

async function CachePokemonNames(allPokemonNames: AllPokemonAPI[]) {
  if (!indexedDBSupport()) {
    console.error("IndexedDB is not supported in this browser.");
    return;
  }

  try {
    // Only initialize the database if it's not already initialized
    await ensureDatabaseInitialized();

    // Store the new data and update timestamp
    await addPokemonNames(allPokemonNames);

    await updateCacheTimestamp();
  } catch (error) {
    console.error("Error caching Pokemon names:", error);
  }
}

async function ensureDatabaseInitialized(): Promise<void> {
  if (db) {
    return;
  }

  if (dbInitializationPromise) {
    return dbInitializationPromise;
  }

  dbInitializationPromise = createDatabase();
  await dbInitializationPromise;
  dbInitializationPromise = null;
}

// Open IndexedDB to cache the Pokemon data.
// Stores the fetched Pokemon data and help us access the data even
// when offline without having to fetch it again.

function indexedDBSupport() {
  return "indexedDB" in window;
}

async function createDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
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
        if (!database.objectStoreNames.contains("pokemonNames")) {
          database
            .createObjectStore("pokemonNames", {
              keyPath: "name",
            })
            .createIndex("name", "name", { unique: true });
        }

        if (!database.objectStoreNames.contains("pokemons")) {
          database
            .createObjectStore("pokemons", {
              keyPath: "id",
            })
            .createIndex("id", "id", { unique: true });
        }

        // Create a separate store for detailed Pokemon data from individual pages
        if (!database.objectStoreNames.contains("pokemonDetails")) {
          database
            .createObjectStore("pokemonDetails", {
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

        if (!database.objectStoreNames.contains("favorites")) {
          database
            .createObjectStore("favorites", {
              keyPath: "id",
            })
            .createIndex("id", "id", { unique: true });
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
      db = request.result;
      resolve();
    };
  });
}

async function addPokemonNames(
  allPokemonNames: AllPokemonAPI[]
): Promise<void> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction("pokemonNames", "readwrite");
    const objectStore = transaction.objectStore("pokemonNames");

    allPokemonNames.forEach((pokemonName) => {
      objectStore.put(pokemonName);
    });

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(new Error("Failed to add Pokemon Names to database"));
    };
  });
}

async function addPokemons(pokemonData: Pokemon[]): Promise<void> {
  await ensureDatabaseInitialized();

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
      resolve();
    };

    transaction.onerror = () => {
      reject(new Error("Failed to add Pokemons to database"));
    };
  });
}

async function addPokemon(pokemonData: Pokemon): Promise<void> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction("pokemons", "readwrite");
    const objectStore = transaction.objectStore("pokemons");

    objectStore.put(pokemonData);

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(new Error("Failed to add Pokemon to database"));
    };
  });
}

async function addDetailedPokemon(pokemonData: Pokemon): Promise<void> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction("pokemonDetails", "readwrite");
    const objectStore = transaction.objectStore("pokemonDetails");

    objectStore.put(pokemonData);

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(new Error("Failed to add detailed Pokemon to database"));
    };
  });
}

async function addFavoritePokemon(pokemonData: Pokemon): Promise<void> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const transaction = db.transaction("favorites", "readwrite");
    const objectStore = transaction.objectStore("favorites");

    objectStore.put(pokemonData);

    transaction.oncomplete = () => {
      resolve();
    };

    transaction.onerror = () => {
      reject(new Error("Failed to add Pokemon to favorites"));
    };
  });
}

async function getAllPokemon(): Promise<Pokemon[]> {
  await ensureDatabaseInitialized();

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
      resolve(pokemons);
    };

    request.onerror = (err) => {
      console.error(`Error getting all Pokemons:`, err);
      reject(err);
    };
  });
}

async function getPokemon(id: string): Promise<Pokemon> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("pokemons", "readonly")
      .objectStore("pokemons")
      .get(Number(id));

    request.onsuccess = () => {
      const pokemon: Pokemon = request.result;
      resolve(pokemon);
    };

    request.onerror = (err) => {
      console.error(`Error getting Pokemon information:`, err);
      reject(err);
    };
  });
}

async function getDetailedPokemon(id: string): Promise<Pokemon> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("pokemonDetails", "readonly")
      .objectStore("pokemonDetails")
      .get(Number(id));

    request.onsuccess = () => {
      const pokemon: Pokemon = request.result;
      resolve(pokemon);
    };

    request.onerror = (err) => {
      console.error(`Error getting detailed Pokemon information:`, err);
      reject(err);
    };
  });
}

async function getAllPokemonNames(): Promise<AllPokemonAPI[]> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("pokemonNames", "readonly")
      .objectStore("pokemonNames")
      .getAll();

    request.onsuccess = () => {
      const pokemonNames: AllPokemonAPI[] = request.result;
      resolve(pokemonNames);
    };

    request.onerror = (err) => {
      console.error(`Error getting Pokemon information:`, err);
      reject(err);
    };
  });
}

async function getPokemonName(search: string): Promise<string> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("pokemonNames", "readonly")
      .objectStore("pokemonNames")
      .get(search);

    request.onsuccess = () => {
      const pokemon: string = request.result;
      resolve(pokemon);
    };

    request.onerror = (err) => {
      console.error(`Error getting Pokemon information:`, err);
      reject(err);
    };
  });
}

async function getAllFavoritePokemon(): Promise<Pokemon[]> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("favorites", "readonly")
      .objectStore("favorites")
      .getAll();

    request.onsuccess = () => {
      const pokemons: Pokemon[] = request.result;
      // Sort by ID
      pokemons.sort((a, b) => (a.id || 0) - (b.id || 0));
      resolve(pokemons);
    };

    request.onerror = (err) => {
      console.error(`Error getting favorite Pokemon:`, err);
      reject(err);
    };
  });
}

async function getFavoritePokemon(id: string): Promise<Pokemon> {
  await ensureDatabaseInitialized();

  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error("Database not initialized"));
      return;
    }

    const request = db
      .transaction("favorites", "readonly")
      .objectStore("favorites")
      .get(Number(id));

    request.onsuccess = () => {
      const pokemon: Pokemon = request.result;
      resolve(pokemon);
    };

    request.onerror = (err) => {
      console.error(`Error getting Pokemon information:`, err);
      reject(err);
    };
  });
}

async function removeAllPokemon(): Promise<void> {
  await ensureDatabaseInitialized();

  if (!db) throw new Error("Database not initialized");

  const transaction = db.transaction("pokemons", "readwrite");
  const objectStore = transaction.objectStore("pokemons");

  return new Promise((resolve, reject) => {
    const request = objectStore.clear();

    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
}

async function removeFavoritePokemon(id: string): Promise<void> {
  await ensureDatabaseInitialized();

  if (!db) throw new Error("Database not initialized");

  const transaction = db.transaction("favorites", "readwrite");
  const objectStore = transaction.objectStore("favorites");

  return new Promise((resolve, reject) => {
    const request = objectStore.delete(Number(id));

    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
}

async function removeAllFavoritePokemon(): Promise<void> {
  await ensureDatabaseInitialized();

  if (!db) throw new Error("Database not initialized");

  const transaction = db.transaction("favorites", "readwrite");
  const objectStore = transaction.objectStore("favorites");

  return new Promise((resolve, reject) => {
    const request = objectStore.clear();

    request.onsuccess = () => resolve();
    request.onerror = (err) => reject(err);
  });
}

// Cache management functions
async function updateCacheTimestamp(): Promise<void> {
  await ensureDatabaseInitialized();

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
  await ensureDatabaseInitialized();

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
      const tenDays = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds

      resolve(cacheAge < tenDays);
    };

    request.onerror = () => resolve(false);
  });
}

export default CachePokemonData;

export {
  CachePokemonData,
  CacheDetailedPokemonData,
  CachePokemonNames,
  indexedDBSupport,
  createDatabase,
  addPokemonNames,
  addPokemons,
  addPokemon,
  addDetailedPokemon,
  addFavoritePokemon,
  getAllPokemon,
  getPokemon,
  getDetailedPokemon,
  getAllPokemonNames,
  getPokemonName,
  getAllFavoritePokemon,
  getFavoritePokemon,
  removeAllPokemon,
  removeFavoritePokemon,
  removeAllFavoritePokemon,
  checkCacheValidity,
  updateCacheTimestamp,
};
