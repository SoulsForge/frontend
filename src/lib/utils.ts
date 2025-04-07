import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// create a string function extension to capitalize the first letter of a string

declare global {
  interface String {
    capitalize(): string;
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

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
