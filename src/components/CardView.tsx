"use client";

import {
  useMotionValue,
  useAnimation,
  useTransform,
  PanInfo,
  motion,
} from "framer-motion";
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
import { useRef, useEffect } from "react";
import { CardData, Character } from "@/types";

export const CardView = ({
  data,
  characters,
  onResolve,
  onPreview,
}: {
  data: CardData;
  characters: Record<string, Character>;
  onResolve: (c: "left" | "right") => void;
  onPreview: (s: "left" | "right" | null) => void;
}) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const lastSide = useRef<"left" | "right" | null>(null);

  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacityRight = useTransform(x, [50, 150], [0, 1]);
  const opacityLeft = useTransform(x, [-150, -50], [1, 0]);

  const leftHintOpacity = useTransform(x, [0, 100], [1, 0.2]);
  const rightHintOpacity = useTransform(x, [-100, 0], [0.2, 1]);

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

  // Entry animation
  useEffect(() => {
    controls.start({
      scale: 1,
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    });
  }, [controls]);

  // Handle Drag logic and report side changes to parent for stats preview
  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const offsetX = info.offset.x;
    let currentSide: "left" | "right" | null = null;

    if (offsetX > 50) currentSide = "right";
    else if (offsetX < -50) currentSide = "left";

    // Only update parent if side changed to avoid spamming re-renders
    if (currentSide !== lastSide.current) {
      lastSide.current = currentSide;
      onPreview(currentSide);
    }
  };

  const handleDragEnd = async (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 100;
    const velocityThreshold = 500;

    // Clear preview
    onPreview(null);
    lastSide.current = null;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      await controls.start({
        x: 500,
        opacity: 0,
        transition: { duration: 0.2 },
      });
      onResolve("right");
    } else if (
      info.offset.x < -threshold ||
      info.velocity.x < -velocityThreshold
    ) {
      await controls.start({
        x: -500,
        opacity: 0,
        transition: { duration: 0.2 },
      });
      onResolve("left");
    } else {
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, rotate }}
      initial={{ scale: 0.8, opacity: 0 }}
      className="relative w-full max-w-md h-[450px] perspective-1000 cursor-grab active:cursor-grabbing"
    >
      <div className="w-full h-full relative paper-texture border-4 border-stone-800 text-stone-900 p-4 flex flex-col card-shadow origin-bottom">
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
            <IconCmp size={20} />
          </div>
        </div>

        <div className="h-40 bg-stone-800 mb-4 flex items-center justify-center overflow-hidden relative border-2 border-stone-900 grayscale contrast-150 pointer-events-none">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,var(--color-stone-500)_1px,transparent_1px)] bg-size-[4px_4px]"></div>
          <IconCmp size={90} className="text-amber-100 opacity-80" />

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
          <motion.div
            style={{ opacity: leftHintOpacity }}
            className="flex items-center gap-1"
          >
            <ArrowLeft size={14} /> {data.left.text}
          </motion.div>
          <motion.div
            style={{ opacity: rightHintOpacity }}
            className="flex items-center gap-1"
          >
            {data.right.text} <ArrowRight size={14} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
