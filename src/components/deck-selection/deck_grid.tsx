"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Deck } from "@/types";
import { DeckCard, PageHeader } from "@/components";
import { ImportDeckCard } from "@/components/deck-selection/import_deck_card";

interface DeckGridProps {
  decks: Deck[];
}

const IMPORTED_DECK_KEY = "imported_deck";

export function DeckGrid({ decks }: DeckGridProps) {
  const router = useRouter();
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [importedDeck, setImportedDeck] = useState<Deck | null>(() => {
    // Inicializar el estado desde localStorage durante la primera renderización
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(IMPORTED_DECK_KEY);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (err) {
          console.error("Error loading imported deck:", err);
          localStorage.removeItem(IMPORTED_DECK_KEY);
        }
      }
    }
    return null;
  });

  const handleDeckSelect = (deckId: string) => {
    const deck = decks.find((d) => d.id === deckId);
    if (deck && deck.unlocked) {
      router.push(`/game?deck=${deckId}`);
    }
  };

  const handleImportedDeckSelect = () => {
    if (importedDeck) {
      router.push(`/game-imported`);
    }
  };

  const handleImport = (deck: Deck) => {
    // Guardar en localStorage
    localStorage.setItem(IMPORTED_DECK_KEY, JSON.stringify(deck));
    setImportedDeck(deck);
  };

  // Combinar decks normales con el deck importado
  const allDecks = [
    ...decks.filter((deck) => !deck.hidden),
    ...(importedDeck ? [importedDeck] : []),
  ];

  return (
    <div className="crt min-h-dvh w-full flex flex-col items-center p-2 sm:p-4 relative font-tech select-none bg-[#1a1815] text-[#dcdcdc] overflow-x-hidden">
      <PageHeader
        title="SELECCIONAR DECK"
        subtitle="Elegí tu escenario político"
        onBack={() => router.push("/")}
      />

      {/* Deck Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-8 px-2 sm:px-0"
      >
        {allDecks.map((deck, index) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            index={index}
            isSelected={selectedDeck === deck.id}
            onSelect={
              deck === importedDeck
                ? handleImportedDeckSelect
                : handleDeckSelect
            }
            onHover={setSelectedDeck}
          />
        ))}

        {/* Import Deck Card */}
        <ImportDeckCard onImport={handleImport} index={allDecks.length} />
      </motion.div>
    </div>
  );
}
