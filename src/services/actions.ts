import { Deck, DeckResponse } from "@/types";
import { TESTING_DECK } from "@/app/decks/__DECK__TESTING";
import {
  CRISIS_2000_CARDS,
  CRISIS_2000_CHARACTERS,
  CRISIS_2000_OBJECTIVES_POOL,
} from "@/app/decks/deck_crisis_2000";
import {
  DEFAULT_CARDS,
  DEFAULT_CHARACTERS,
  DEFAULT_OBJECTIVES,
} from "@/app/decks/deck_default";
import {
  CFK_CARDS,
  CFK_CHARACTERS,
  CFK_OBJECTIVES_POOL,
} from "@/app/decks/deck_kirchnerismo";
import {
  MENEM_CARDS,
  MENEM_CHARACTERS,
  MENEM_OBJECTIVES_POOL,
} from "@/app/decks/deck_menem";
import { QATAR_CARDS, QATAR_CHARACTERS } from "@/app/decks/deck_qatar";
import { QATAR_OBJECTIVES } from "../app/decks/deck_qatar";
import {
  VLLC_CARDS,
  VLLC_CHARACTERS,
  VLLC_OBJECTIVES_POOL,
} from "@/app/decks/deck_viva_la_libertad";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ==========================================
// LOCAL DATA (fallback)
// ==========================================

// ==========================================
// LOCAL DATA HELPERS
// ==========================================

const ALL_CARDS = [
  ...DEFAULT_CARDS,
  ...CRISIS_2000_CARDS,
  ...CFK_CARDS,
  ...VLLC_CARDS,
  ...MENEM_CARDS,
  ...QATAR_CARDS,
];

const ALL_CHARACTERS = {
  ...DEFAULT_CHARACTERS,
  ...CRISIS_2000_CHARACTERS,
  ...CFK_CHARACTERS,
  ...VLLC_CHARACTERS,
  ...MENEM_CHARACTERS,
  ...QATAR_CHARACTERS,
};

const ALL_OBJECTIVES = [
  ...DEFAULT_OBJECTIVES,
  ...CRISIS_2000_OBJECTIVES_POOL,
  ...CFK_OBJECTIVES_POOL,
  ...VLLC_OBJECTIVES_POOL,
  ...MENEM_OBJECTIVES_POOL,
  ...QATAR_OBJECTIVES,
];

function getLocalDecks(): Deck[] {
  return [
    {
      id: "default",
      name: "El Modelo 2.0",
      description: "El deck clásico de la política argentina",
      difficulty: "medium",
      thumbnail: "🇦🇷",
      cards: DEFAULT_CARDS,
      characters: DEFAULT_CHARACTERS,
      objectivesPool: DEFAULT_OBJECTIVES,
      unlocked: true,
    },
    {
      id: "qatar22",
      name: "Mundial 2022",
      description: "El deck del mundial de Messi y del Beto",
      difficulty: "easy",
      thumbnail: "🏆",
      cards: QATAR_CARDS,
      characters: QATAR_CHARACTERS,
      objectivesPool: QATAR_OBJECTIVES,
      unlocked: false,
    },
    {
      id: "crisis",
      name: "Crisis del 2001",
      description: "Sobreviví a la peor crisis económica",
      difficulty: "hard",
      thumbnail: "💥",
      cards: CRISIS_2000_CARDS,
      characters: CRISIS_2000_CHARACTERS,
      objectivesPool: CRISIS_2000_OBJECTIVES_POOL,
      unlocked: false,
    },
    {
      id: "golden",
      name: "Década Dorada",
      description: "Modo fácil con recursos abundantes",
      difficulty: "easy",
      thumbnail: "✨",
      cards: CFK_CARDS,
      characters: CFK_CHARACTERS,
      objectivesPool: CFK_OBJECTIVES_POOL,
      unlocked: false,
    },
    {
      id: "all",
      name: "El Deck Completo",
      description: "Todos los decks combinados en uno solo",
      difficulty: "hard",
      thumbnail: "🎲",
      cards: ALL_CARDS,
      characters: ALL_CHARACTERS,
      objectivesPool: ALL_OBJECTIVES,
      unlocked: false,
    },
    {
      id: "viva_la_libertad",
      name: "Viva La Libertad Carajo",
      description: "El deck de la libertad y el progreso",
      difficulty: "medium",
      thumbnail: "🚀",
      cards: VLLC_CARDS,
      characters: VLLC_CHARACTERS,
      objectivesPool: VLLC_OBJECTIVES_POOL,
      unlocked: false,
    },
    {
      id: "menem",
      name: "Menem lo hizo",
      description: "El deck del menemismo y la convertibilidad",
      difficulty: "hard",
      thumbnail: "🕶️",
      cards: MENEM_CARDS,
      characters: MENEM_CHARACTERS,
      objectivesPool: MENEM_OBJECTIVES_POOL,
      unlocked: false,
    },
    {
      id: "mundial_78",
      name: "Mundial '78",
      description: "El deck de la gloria deportiva y el autoritarismo",
      difficulty: "medium",
      thumbnail: "🏆",
      cards: [],
      characters: {},
      objectivesPool: [],
      unlocked: false,
    },
    TESTING_DECK,
  ];
}

// ==========================================
// SERVER-SIDE DATA FETCHING FUNCTIONS
// These are meant to be used in Server Components
// ==========================================

export async function getDecks(): Promise<Deck[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/decks`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    const data: DeckResponse = await response.json();
    return data.decks;
  } catch (error) {
    console.error("Error fetching decks:", error);
    // Fallback to local decks
    return getLocalDecks();
  }
}

export async function getDeckById(id: string): Promise<Deck | null> {
  try {
    const localDeckIds = getLocalDecks().map((d) => d.id);

    if (!id || localDeckIds.includes(id)) {
      const _id = id || "default";
      const localDecks = getLocalDecks();
      return localDecks.find((d) => d.id === _id) || null;
    }

    const response = await fetch(`${API_BASE_URL}/decks/${id}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

    return response.json();
  } catch (error) {
    console.error("Error fetching deck:", error);

    const localDecks = getLocalDecks();
    return localDecks.find((d) => d.id === "default") || null;
  }
}
