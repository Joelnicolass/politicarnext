"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Deck } from "@/types";
import { DeckCard } from "@/components/DeckCard";

interface DeckGridProps {
  decks: Deck[];
}

export function DeckGrid({ decks }: DeckGridProps) {
  const router = useRouter();
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);

  const handleDeckSelect = (deckId: string) => {
    const deck = decks.find((d) => d.id === deckId);
    if (deck && deck.unlocked) {
      router.push(`/game?deck=${deckId}`);
    }
  };

  return (
    <div className="crt h-screen w-full flex flex-col items-center p-4 relative font-tech select-none bg-[#1a1815] text-[#dcdcdc] overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-stone-800 p-4 border-b-4 border-red-900 shadow-lg mb-6"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="bg-stone-700 hover:bg-stone-600 p-2 rounded border border-stone-600 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-red-600 font-propaganda text-3xl tracking-tighter">
              SELECCIONAR DECK
            </h1>
            <p className="text-xs text-stone-400 font-tech">
              Elegí tu escenario político
            </p>
          </div>
        </div>
      </motion.div>

      {/* Deck Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8"
      >
        {decks.map((deck, index) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            index={index}
            isSelected={selectedDeck === deck.id}
            onSelect={handleDeckSelect}
            onHover={setSelectedDeck}
          />
        ))}
      </motion.div>
    </div>
  );
}
