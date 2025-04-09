import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function deepMerge(existing: any, updates: any): any {
  if (typeof existing !== "object" || typeof updates !== "object") {
    return updates !== undefined ? updates : existing;
  }

  const merged = { ...existing };
  for (const key of Object.keys(updates)) {
    merged[key] = deepMerge(existing[key], updates[key]);
  }
  return merged;
}
