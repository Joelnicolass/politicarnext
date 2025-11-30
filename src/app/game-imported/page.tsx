"use client";

import { Deck } from "@/types";
import GameScreen from "@/screens/game_screen";
import { notFound } from "next/navigation";

export default function GameImportedPage() {
  const loadDeckFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("imported_deck");
      if (stored) {
        try {
          const parsedDeck: Deck = JSON.parse(stored);
          return parsedDeck;
        } catch (err) {
          console.error("Error loading imported deck:", err);
          localStorage.removeItem("imported_deck");
        }
      }
    }
  };

  const deck = loadDeckFromLocalStorage();

  if (!deck) {
    notFound();
  }

  return (
    <GameScreen
      cards={deck.cards}
      characters={deck.characters}
      objectivesPool={deck.objectivesPool}
      difficulty={deck.difficulty}
    />
  );
}
