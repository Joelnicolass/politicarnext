import { Deck, DeckResponse } from "@/types";
import { CardData, Character, Objective } from "@/types";
import {
  CRISIS_2000_CARDS,
  CRISIS_2000_CHARACTERS,
  CRISIS_2000_OBJECTIVES_POOL,
} from "@/utils/deck_crisis_2000";
import {
  DEFAULT_CARDS,
  DEFAULT_CHARACTERS,
  DEFAULT_OBJECTIVES,
} from "@/utils/deck_default";
import {
  CFK_CARDS,
  CFK_CHARACTERS,
  CFK_OBJECTIVES_POOL,
} from "@/utils/deck_kirchnerismo";
import {
  MENEM_CARDS,
  MENEM_CHARACTERS,
  MENEM_OBJECTIVES_POOL,
} from "@/utils/deck_menem";
import {
  VLLC_CARDS,
  VLLC_CHARACTERS,
  VLLC_OBJECTIVES_POOL,
} from "@/utils/deck_viva_la_libertad";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// ==========================================
// LOCAL DATA (fallback)
// ==========================================

// ==========================================
// LOCAL DATA HELPERS
// ==========================================

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
      id: "crisis",
      name: "Crisis del 2001",
      description: "Sobreviví a la peor crisis económica",
      difficulty: "hard",
      thumbnail: "💥",
      cards: CRISIS_2000_CARDS,
      characters: CRISIS_2000_CHARACTERS,
      objectivesPool: CRISIS_2000_OBJECTIVES_POOL,
      unlocked: true,
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
      unlocked: true,
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
      unlocked: true,
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
      unlocked: true,
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
    {
      unlocked: false,
      id: "testing",
      name: "Testing Deck",
      description: "A deck for testing purposes",
      difficulty: "easy",
      thumbnail: "🧪",
      cards: [
        {
          id: 99991,
          left: {
            effect: [0, 0, 0, 0],
            text: "Test Left Choice",
            tags: ["test"],
            statusEffect: undefined,
          },
          right: {
            effect: [0, 0, 0, 0],
            text: "Test Right Choice",
            tags: ["test"],
            statusEffect: undefined,
          },
          speaker: "test_character",
          text: "This is a test card for testing purposes.",
        },
        {
          id: 99992,
          left: {
            effect: [0, 0, 0, 0],
            text: "Test Left Choice",
            tags: ["test"],
            statusEffect: undefined,
          },
          right: {
            effect: [0, 0, 0, 0],
            text: "Test Right Choice",
            tags: ["test"],
            statusEffect: undefined,
          },
          speaker: "test_character",
          text: "This is a test card for testing purposes.",
        },
        {
          id: 99993,
          left: {
            effect: [0, 0, 0, 0],
            text: "Test Left Choice",
            tags: ["test"],
            statusEffect: undefined,
          },
          right: {
            effect: [0, 0, 0, 0],
            text: "Test Right Choice",
            tags: ["test"],
            statusEffect: undefined,
          },
          speaker: "test_character",
          text: "This is a test card for testing purposes.",
        },
      ],
      characters: {
        test_character: {
          id: "test_character",
          name: "Test Character",
          icon: "briefcase",
        },
      },
      objectivesPool: [
        {
          id: "test_objective_1",
          description: "Achieve testing excellence.",
          requiredTag: "positive",
        },
      ],
    },
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
