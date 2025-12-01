import { getTitle } from "./dev.utils";

export const VERSION = "2.3.2";
export const APP_NAME = getTitle();

// Difficulty multipliers for card effects
export const DIFFICULTY = {
  easy: 0.75, // 75% of the effect
  medium: 1.0, // 100% of the effect (normal)
  hard: 1.5, // 150% of the effect
} as const;
