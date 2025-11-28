"use client";

import { motion } from "framer-motion";
import {
  LucideIcon,
  Briefcase,
  Megaphone,
  DollarSign,
  Shield,
  Users,
  Tv,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { TinderCard } from "@/components";
import {
  SwipeSide,
  SwipeSideOrNull,
  CARD_VISUAL,
} from "@/components/TinderCard";

import { CardData, Character } from "@/types";

export const CardView = ({
  data,
  characters,
  onResolve,
  onPreview,
}: {
  data: CardData;
  characters: Record<string, Character>;
  onResolve: (c: SwipeSide) => void;
  onPreview: (s: SwipeSideOrNull) => void;
}) => {
  const defaultCharacter: Character = {
    id: "min",
    name: "MINISTRO",
    icon: "briefcase",
  };
  const character = characters[data.speaker] || defaultCharacter;

  const iconMap: Record<string, LucideIcon> = {
    briefcase: Briefcase,
    megaphone: Megaphone,
    "dollar-sign": DollarSign,
    shield: Shield,
    users: Users,
    tv: Tv,
  };

  const IconCmp: LucideIcon = iconMap[character.icon] || Briefcase;

  return (
    <TinderCard
      onResolve={onResolve}
      onPreview={onPreview}
      className="relative w-full max-w-[90vw] sm:max-w-md h-[350px] sm:h-[450px] perspective-1000 cursor-grab active:cursor-grabbing"
    >
      {({ opacityRight, opacityLeft, isDragging }) => (
        <div
          className="w-full h-full relative paper-texture border-2 sm:border-4 border-stone-800 text-stone-900 p-3 sm:p-4 flex flex-col card-shadow origin-bottom"
          style={{
            willChange: isDragging ? "transform" : "auto",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <motion.div
            style={{ opacity: opacityRight }}
            className="absolute top-6 sm:top-10 left-6 sm:left-10 border-2 sm:border-4 border-green-700 text-green-700 font-bold text-2xl sm:text-4xl p-1 sm:p-2 -rotate-12 z-20 pointer-events-none"
          >
            {data.right.text}
          </motion.div>
          <motion.div
            style={{ opacity: opacityLeft }}
            className="absolute top-6 sm:top-10 right-6 sm:right-10 border-2 sm:border-4 border-red-700 text-red-700 font-bold text-2xl sm:text-4xl p-1 sm:p-2 rotate-12 z-20 pointer-events-none"
          >
            {data.left.text}
          </motion.div>

          <div className="border-b-2 border-stone-800 pb-1.5 sm:pb-2 mb-2 sm:mb-4 flex justify-between items-center pointer-events-none">
            <span className="font-bold tracking-widest uppercase text-[10px] sm:text-sm bg-stone-800 text-amber-100 px-1.5 sm:px-2 py-0.5 sm:py-1">
              EXP #{data.id}
            </span>
            <div className="bg-red-800 text-white rounded-full p-0.5 sm:p-1">
              <IconCmp size={16} className="sm:w-5 sm:h-5" />
            </div>
          </div>

          <div
            className="h-24 sm:h-40 bg-stone-800 mb-2 sm:mb-4 flex items-center justify-center overflow-hidden relative border-2 border-stone-900 grayscale contrast-150 pointer-events-none"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            {!isDragging && (
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,var(--color-stone-500)_1px,transparent_1px)] bg-size-[4px_4px]"></div>
            )}
            <IconCmp
              size={48}
              className="sm:w-20 sm:h-20 text-amber-100 opacity-80"
            />

            <span className="absolute bottom-1 sm:bottom-2 text-stone-200 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1">
              {character.name}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center pointer-events-none overflow-hidden">
            <p className="font-typewriter text-sm sm:text-lg leading-snug text-center font-bold px-1 sm:px-2 select-none line-clamp-4 sm:line-clamp-none">
              &ldquo;{data.text}&rdquo;
            </p>
          </div>

          <div className="mt-2 sm:mt-4 flex justify-between text-[10px] sm:text-xs font-mono uppercase text-stone-500 border-t border-stone-400 pt-1.5 sm:pt-2 pointer-events-none">
            <div
              className="flex items-center gap-0.5 sm:gap-1 transition-opacity"
              style={{
                opacity: isDragging
                  ? CARD_VISUAL.DRAGGING_OPACITY
                  : CARD_VISUAL.NORMAL_OPACITY,
              }}
            >
              <ArrowLeft size={12} className="sm:w-4 sm:h-4" /> {data.left.text}
            </div>
            <div
              className="flex items-center gap-0.5 sm:gap-1 transition-opacity"
              style={{
                opacity: isDragging
                  ? CARD_VISUAL.DRAGGING_OPACITY
                  : CARD_VISUAL.NORMAL_OPACITY,
              }}
            >
              {data.right.text}{" "}
              <ArrowRight size={12} className="sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      )}
    </TinderCard>
  );
};
