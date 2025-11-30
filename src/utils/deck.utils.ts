import { CardData, Character, Objective } from "@/types";
import { Difficulty } from "@/types/reducer";
import { DIFFICULTY } from "./constants";

export function shuffleCards(cards: CardData[]): CardData[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Filtra cartas que no existen actualmente en el deck
 */
export function filterNewCards(
  existingCards: CardData[],
  newCards: CardData[]
): CardData[] {
  const existingIds = new Set(existingCards.map((c) => c.id));
  const filtered = newCards.filter((card) => !existingIds.has(card.id));

  return filtered;
}

/**
 * Filtra personajes que no existen actualmente
 */
export function filterNewCharacters(
  existingCharacters: Record<string, Character>,
  newCharacters: Record<string, Character>
): Record<string, Character> {
  const filtered: Record<string, Character> = {};

  for (const [id, character] of Object.entries(newCharacters)) {
    if (!existingCharacters[id]) filtered[id] = character;
  }

  return filtered;
}

/**
 * Filtra objetivos que no existen actualmente
 */
export function filterNewObjectives(
  existingObjectives: Objective[],
  newObjectives: Omit<Objective, "completed">[]
): Omit<Objective, "completed">[] {
  const existingIds = new Set(existingObjectives.map((o) => o.id));
  const filtered = newObjectives.filter((obj) => !existingIds.has(obj.id));

  return filtered;
}

/**
 * Apply difficulty multiplier to an effect value
 * Preserves the sign and increases the absolute value
 */
export function applyDifficultyMultiplier(
  value: number,
  difficulty: Difficulty
): number {
  if (value === 0) return 0;

  const multiplied = value * DIFFICULTY[difficulty];
  return value > 0 ? Math.ceil(multiplied) : Math.floor(multiplied);
}

/**
 * Apply difficulty multiplier to all stats in an effect array
 */
export function applyDifficultyToEffect(
  effect: [number, number, number, number],
  difficulty: Difficulty
): [number, number, number, number] {
  return effect.map((val) => applyDifficultyMultiplier(val, difficulty)) as [
    number,
    number,
    number,
    number
  ];
}

/**
 * Draws a new card from the deck
 * Handles reshuffling if needed
 */
export function drawCardFromDeck(
  available: CardData[],
  discard: CardData[],
  cardToDiscard?: CardData | null
): {
  nextCard: CardData | null;
  updatedAvailable: CardData[];
  updatedDiscard: CardData[];
} {
  let updatedAvailable = [...available];
  let updatedDiscard = [...discard];

  // Discard current card if provided
  if (cardToDiscard) {
    updatedDiscard.push(cardToDiscard);
  }

  // Reshuffle if no cards available
  if (updatedAvailable.length === 0 && updatedDiscard.length > 0) {
    updatedAvailable = shuffleCards(updatedDiscard);
    updatedDiscard = [];
  }

  // Draw a random card
  if (updatedAvailable.length === 0) {
    return {
      nextCard: null,
      updatedAvailable: [],
      updatedDiscard: [],
    };
  }

  const randomIdx = Math.floor(Math.random() * updatedAvailable.length);
  const nextCard = updatedAvailable[randomIdx];
  updatedAvailable = updatedAvailable.filter((_, idx) => idx !== randomIdx);

  return {
    nextCard,
    updatedAvailable,
    updatedDiscard,
  };
}
