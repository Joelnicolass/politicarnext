import { useState, useCallback } from "react";

interface UseDeckOptions<T> {
  initialCards: T[];
  shuffle?: boolean;
}

interface UseDeckReturn<T> {
  availableCount: number;
  discardCount: number;
  totalCount: number;
  drawCard: (cardToDiscard?: T | null) => T | null;
  reset: () => void;
}

export function useDeck<T>({
  initialCards,
  shuffle = true,
}: UseDeckOptions<T>): UseDeckReturn<T> {
  // Shuffle function
  const shuffleCards = useCallback((cards: T[]): T[] => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Initialize deck
  const initializeDeck = useCallback(
    (cards: T[]) => {
      return shuffle ? shuffleCards(cards) : [...cards];
    },
    [shuffle, shuffleCards]
  );

  // State: available deck and discard pile
  const [deck, setDeck] = useState<T[]>(() => initializeDeck(initialCards));
  const [discard, setDiscard] = useState<T[]>([]);

  // Draw a card from the deck, optionally discarding a card first
  const drawCard = useCallback(
    (cardToDiscard?: T | null): T | null => {
      let currentDeck = deck;
      let currentDiscard = discard;

      // Add card to discard if provided
      if (cardToDiscard) {
        currentDiscard = [...currentDiscard, cardToDiscard];
      }

      // If deck is empty, reshuffle discard pile
      if (currentDeck.length === 0) {
        if (currentDiscard.length === 0) {
          console.warn("No cards available to draw");
          return null;
        }

        console.log("Reshuffling deck:", currentDiscard.length, "cards");
        currentDeck = shuffleCards(currentDiscard);
        currentDiscard = [];
      }

      // Draw a random card
      const randomIdx = Math.floor(Math.random() * currentDeck.length);
      const selectedCard = currentDeck[randomIdx];

      // Update deck and discard
      const newDeck = currentDeck.filter((_, idx) => idx !== randomIdx);
      setDeck(newDeck);
      setDiscard(currentDiscard);

      return selectedCard;
    },
    [deck, discard, shuffleCards]
  );

  // Reset the deck
  const reset = useCallback(() => {
    setDeck(initializeDeck(initialCards));
    setDiscard([]);
  }, [initialCards, initializeDeck]);

  return {
    availableCount: deck.length,
    discardCount: discard.length,
    totalCount: initialCards.length,
    drawCard,
    reset,
  };
}
