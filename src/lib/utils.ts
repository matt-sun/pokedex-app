import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(
  error: unknown,
  defaultMessage: string,
  mountedRef: React.RefObject<boolean>,
  setError: (value: React.SetStateAction<string | null>) => void,
  setIsLoading: (value: React.SetStateAction<boolean>) => void
) {
  const message = error instanceof Error ? error.message : defaultMessage;
  console.error(defaultMessage + ":", error);
  if (mountedRef.current) {
    setError(message);
    setIsLoading(false);
  }
}

export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export function getPokemonTypeColor(type?: string): string {
  switch (type) {
    case "normal":
      return "pokemon-normal";
    case "fire":
      return "pokemon-fire";
    case "water":
      return "pokemon-water";
    case "electric":
      return "pokemon-electric";
    case "grass":
      return "pokemon-grass";
    case "ice":
      return "pokemon-ice";
    case "fighting":
      return "pokemon-fighting";
    case "poison":
      return "pokemon-poison";
    case "ground":
      return "pokemon-ground";
    case "flying":
      return "pokemon-flying";
    case "psychic":
      return "pokemon-psychic";
    case "bug":
      return "pokemon-bug";
    case "rock":
      return "pokemon-rock";
    case "ghost":
      return "pokemon-ghost";
    case "dragon":
      return "pokemon-dragon";
    case "dark":
      return "pokemon-dark";
    case "steel":
      return "pokemon-steel";
    case "fairy":
      return "pokemon-fairy";
    default:
      return "pokemon-normal";
  }
}

export function getPokemonTypeStyles(type1?: string, type2?: string) {
  const color1 = getPokemonTypeColor(type1);
  const color2 = type2 ? getPokemonTypeColor(type2) : color1;

  return {
    gradient: `bg-linear-65 from-${color1} to-${color2}`,
    gradient1: `from-${color1}`,
    gradientLight1: `from-${color1}/50`,
    gradient2: `to-${color2}`,
    gradientLight2: `to-${color2}/50`,
    border: `border-${color1}`,
    borderLight: `border-${color1}/20`,
    background1: `bg-${color1}`,
    background2: `bg-${color2}`,
  };
}
