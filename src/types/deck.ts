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
  hidden?: boolean;
}

export interface DeckResponse {
  decks: Deck[];
}

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export type StatType = 0 | 1 | 2 | 3;

export interface StatusEffect {
  name: string;
  stat: StatType;
  val: number;
  duration: number;
  type: "good" | "bad";
}

export interface SpecialEffect {
  type: "add_deck" | "add_cards" | "add_objectives"; // Extensible para futuros efectos
  data?: unknown;
}

// Specific special effect types for type safety
export interface AddDeckEffect extends SpecialEffect {
  type: "add_deck";
  data: import("./deck").Deck;
}

export interface AddCardsEffect extends SpecialEffect {
  type: "add_cards";
  data: {
    cards: CardData[];
  };
}

export interface AddObjectivesEffect extends SpecialEffect {
  type: "add_objectives";
  data: {
    objectives: Omit<Objective, "completed">[];
  };
}

export type SpecialEffectUnion =
  | AddDeckEffect
  | AddCardsEffect
  | AddObjectivesEffect;

export interface Choice {
  text: string;
  effect: [number, number, number, number]; // Delta for each stat
  statusEffect?: StatusEffect; // Optional status effect applied
  tags?: string[]; // Tags for objectives
  specialEffect?: SpecialEffect; // Special effects
}

export interface CardData {
  id: number;
  speaker: string;
  text: string;
  left: Choice;
  right: Choice;
}

export interface Objective {
  id: string;
  description: string;
  requiredTag: string;
  completed: boolean;
}

export interface Character {
  id: string;
  name: string;
  icon: string;
  img?: string;
}
