"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Deck } from "@/types";

interface DeckCardProps {
  deck: Deck;
  index: number;
  isSelected: boolean;
  onSelect: (deckId: string) => void;
  onHover: (deckId: string | null) => void;
}

const DIFFICULTY_COLORS = {
  easy: "text-green-400",
  medium: "text-yellow-400",
  hard: "text-red-400",
} as const;

const DIFFICULTY_LABELS = {
  easy: "Fácil",
  medium: "Media",
  hard: "Difícil",
} as const;

export function DeckCard({
  deck,
  index,
  isSelected,
  onSelect,
  onHover,
}: DeckCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => deck.unlocked && onSelect(deck.id)}
      onMouseEnter={() => onHover(deck.id)}
      onMouseLeave={() => onHover(null)}
      className={`paper-texture border-2 sm:border-4 ${
        deck.unlocked
          ? "border-stone-800 cursor-pointer hover:border-red-800 hover:shadow-2xl hover:scale-105"
          : "border-stone-700 opacity-60 cursor-not-allowed"
      } p-4 sm:p-6 rounded-lg transition-all duration-300 relative ${
        isSelected ? "scale-105 shadow-2xl" : ""
      }`}
    >
      {/* Lock overlay */}
      {!deck.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
          <Lock size={36} className="sm:w-12 sm:h-12 text-stone-500" />
        </div>
      )}

      {/* Thumbnail */}
      <div className="text-4xl sm:text-6xl text-center mb-3 sm:mb-4">
        {deck.thumbnail}
      </div>

      {/* Info */}
      <h3 className="font-propaganda text-lg sm:text-xl text-stone-900 mb-2 text-center">
        {deck.name}
      </h3>
      <p className="font-typewriter text-xs sm:text-sm text-stone-700 mb-3 text-center min-h-10">
        {deck.description}
      </p>

      {/* Difficulty */}
      <div className="flex justify-center items-center gap-2">
        <span className="text-[10px] sm:text-xs text-stone-600 uppercase">
          Dificultad:
        </span>
        <span
          className={`text-[10px] sm:text-xs font-bold uppercase ${
            DIFFICULTY_COLORS[deck.difficulty]
          }`}
        >
          {DIFFICULTY_LABELS[deck.difficulty]}
        </span>
      </div>
    </motion.div>
  );
}
