import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const xpForLevel = (level: number) => Math.floor(100 * Math.pow(1.5, level - 1));
