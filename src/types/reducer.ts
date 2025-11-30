import { CardData, Character, Choice, Objective, StatusEffect } from ".";

export enum Action {
  INIT_GAME,
  DRAW_CARD,
  PROCESS_TURN,
  ADD_CARDS,
  ADD_DECK,
  ADD_OBJECTIVES,
  ADD_CHARACTERS,
  SET_PREVIEW,
  RESET_GAME,
}

// ==========================================
// STATE TYPES
// ==========================================

export interface DeckState {
  available: CardData[];
  discard: CardData[];
}

export interface GameState {
  // Game progress
  turns: number;
  currentCard: CardData | null;

  // Deck state
  deck: DeckState;
  addedDeckIds: Set<string>; // Track which decks have been added

  // Stats
  stats: [number, number, number, number];
  gameOver: string | null;

  // Effects & Objectives
  activeEffects: StatusEffect[];
  objectives: Objective[];
  allObjectivesCompleted: boolean;

  // UI State
  turnLog: string | null;
  previewSide: "left" | "right" | null;
  previewDiffs: [number, number, number, number];

  // Dynamic content
  characters: Record<string, Character>;
}

// ==========================================
// PAYLOADS ACTION TYPES
// ==========================================

export type InitGamePayload = {
  initialCards: CardData[];
  objectives: Objective[];
};

export type DrawCardPayload = {
  cardToDiscard?: CardData | null;
};

export interface ProcessTurnPayload {
  choice: Choice;
}

export type addCardsPayload = CardData[];

export interface AddDeckPayload {
  id: string;
  cards: CardData[];
  characters?: Record<string, Character>;
  objectives?: Omit<Objective, "completed">[];
}

export type AddObjectivesPayload = Omit<Objective, "completed">[];

export type AddCharactersPayload = Record<string, Character>;

export type SetPreviewPayload = "left" | "right" | null;

export interface ResetGamePayload {
  initialCards: CardData[];
  objectives: Objective[];
  characters: Record<string, Character>;
}

// ==========================================
// ACTION TYPES
// ==========================================

export type GameAction =
  | {
      type: Action.INIT_GAME;
      payload: InitGamePayload;
    }
  | { type: Action.DRAW_CARD; payload: DrawCardPayload }
  | { type: Action.PROCESS_TURN; payload: ProcessTurnPayload }
  | { type: Action.ADD_CARDS; payload: addCardsPayload }
  | {
      type: Action.ADD_DECK;
      payload: AddDeckPayload;
    }
  | { type: Action.ADD_OBJECTIVES; payload: AddObjectivesPayload }
  | { type: Action.ADD_CHARACTERS; payload: AddCharactersPayload }
  | { type: Action.SET_PREVIEW; payload: SetPreviewPayload }
  | {
      type: Action.RESET_GAME;
      payload: ResetGamePayload;
    };

// ==========================================
// CONTEXT TYPE
// ==========================================

export interface GameContextValue {
  state: GameState;

  // Actions
  handleChoice: (dir: "left" | "right") => void;
  handlePreview: (side: "left" | "right" | null) => void;
  resetGame: () => void;

  // Deck info
  deckInfo: {
    availableCount: number;
    discardCount: number;
    totalCount: number;
  };
}
