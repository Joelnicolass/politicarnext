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
      className="relative w-full max-w-md h-[450px] perspective-1000 cursor-grab active:cursor-grabbing"
    >
      {({ opacityRight, opacityLeft, isDragging }) => (
        <div
          className="w-full h-full relative paper-texture border-4 border-stone-800 text-stone-900 p-4 flex flex-col card-shadow origin-bottom"
          style={{
            willChange: isDragging ? "transform" : "auto",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <motion.div
            style={{ opacity: opacityRight }}
            className="absolute top-10 left-10 border-4 border-green-700 text-green-700 font-bold text-4xl p-2 -rotate-12 z-20 pointer-events-none"
          >
            {data.right.text}
          </motion.div>
          <motion.div
            style={{ opacity: opacityLeft }}
            className="absolute top-10 right-10 border-4 border-red-700 text-red-700 font-bold text-4xl p-2 rotate-12 z-20 pointer-events-none"
          >
            {data.left.text}
          </motion.div>

          <div className="border-b-2 border-stone-800 pb-2 mb-4 flex justify-between items-center pointer-events-none">
            <span className="font-bold tracking-widest uppercase text-sm bg-stone-800 text-amber-100 px-2 py-1">
              EXP #{data.id}
            </span>
            <div className="bg-red-800 text-white rounded-full p-1">
              <IconCmp size={CARD_VISUAL.ICON_SIZE_SMALL} />
            </div>
          </div>

          <div
            className="h-40 bg-stone-800 mb-4 flex items-center justify-center overflow-hidden relative border-2 border-stone-900 grayscale contrast-150 pointer-events-none"
            style={{
              transform: "translateZ(0)",
              backfaceVisibility: "hidden",
            }}
          >
            {!isDragging && (
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,var(--color-stone-500)_1px,transparent_1px)] bg-size-[4px_4px]"></div>
            )}
            <IconCmp
              size={CARD_VISUAL.ICON_SIZE_MEDIUM}
              className="text-amber-100 opacity-80"
            />

            <span className="absolute bottom-2 text-stone-200 text-sm px-2 py-1">
              {character.name}
            </span>
          </div>

          <div className="flex-1 flex items-center justify-center pointer-events-none">
            <p className="font-typewriter text-lg leading-snug text-center font-bold px-2 select-none">
              &ldquo;{data.text}&rdquo;
            </p>
          </div>

          <div className="mt-4 flex justify-between text-xs font-mono uppercase text-stone-500 border-t border-stone-400 pt-2 pointer-events-none">
            <div
              className="flex items-center gap-1 transition-opacity"
              style={{
                opacity: isDragging
                  ? CARD_VISUAL.DRAGGING_OPACITY
                  : CARD_VISUAL.NORMAL_OPACITY,
              }}
            >
              <ArrowLeft size={CARD_VISUAL.ICON_SIZE_ARROW} /> {data.left.text}
            </div>
            <div
              className="flex items-center gap-1 transition-opacity"
              style={{
                opacity: isDragging
                  ? CARD_VISUAL.DRAGGING_OPACITY
                  : CARD_VISUAL.NORMAL_OPACITY,
              }}
            >
              {data.right.text}{" "}
              <ArrowRight size={CARD_VISUAL.ICON_SIZE_ARROW} />
            </div>
          </div>
        </div>
      )}
    </TinderCard>
  );
};
