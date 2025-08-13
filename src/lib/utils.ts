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
