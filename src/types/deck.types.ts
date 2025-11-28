import { CardData, Character, Objective } from "./types";

export interface Deck {
  id: string;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  thumbnail: string;
  cards: CardData[];
  characters: Record<string, Character>;
  objectivesPool: Omit<Objective, "completed">[];
  unlocked: boolean;
}

export interface DeckResponse {
  decks: Deck[];
}
