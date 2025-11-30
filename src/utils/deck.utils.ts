import { CardData, Character, Objective } from "@/types";

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
