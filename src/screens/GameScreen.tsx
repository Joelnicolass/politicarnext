"use client";

import { useState, useCallback, useMemo } from "react";
import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { StatusEffect, CardData, Choice, Character, Objective } from "@/types";
import { CardView } from "@/components/CardView";
import { GameOverScreen } from "@/components/GameOver";
import { ObjectiveItem } from "@/components/ObjetivesItem";
import { StatBar } from "@/components/StatsBar";
import {
  useGameStats,
  useObjectives,
  useEffectOnce,
  useDeck,
  useIsMobile,
} from "@/hooks";
import { motion } from "framer-motion";

interface GameScreenProps {
  cards: CardData[];
  characters: Record<string, Character>;
  objectivesPool: Omit<Objective, "completed">[];
}

export default function GameScreen({
  cards,
  characters,
  objectivesPool,
}: GameScreenProps) {
  const router = useRouter();

  const { stats, gameOver, updateStats, resetStats } = useGameStats();
  const { objectives, allCompleted, initObjectives, checkObjectives } =
    useObjectives();

  // Game State
  const deck = useDeck({ initialCards: cards, shuffle: true });

  const [turns, setTurns] = useState(0);
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [activeEffects, setActiveEffects] = useState<StatusEffect[]>([]);
  const [turnLog, setTurnLog] = useState<string | null>(null);
  const [previewSide, setPreviewSide] = useState<"left" | "right" | null>(null);

  // Initial Boot
  useEffectOnce(() => {
    setCurrentCard(deck.drawCard());
    initObjectives(objectivesPool);
  });

  const handleRestart = () => {
    resetStats();
    initObjectives(objectivesPool);
    setTurns(0);
    setActiveEffects([]);
    setTurnLog(null);

    // Reset deck and draw first card
    deck.reset();
    setCurrentCard(deck.drawCard());
  };

  const handleBackToMenu = () => {
    router.push("/");
  };

  // Logic to process the turn
  const resolveTurn = useCallback(
    (choice: Choice) => {
      updateStats(choice.effect);
      if (choice.tags) checkObjectives(choice.tags);

      let nextEffects = [...activeEffects];
      if (choice.statusEffect) {
        nextEffects.push({ ...choice.statusEffect });
        setTurnLog(`¡Activado: ${choice.statusEffect.name}!`);
      } else {
        setTurnLog(null);
      }

      const passiveDelta = [0, 0, 0, 0];
      nextEffects.forEach((eff) => {
        passiveDelta[eff.stat] += eff.val;
      });
      updateStats(passiveDelta);

      nextEffects = nextEffects
        .map((e) => ({ ...e, duration: e.duration - 1 }))
        .filter((e) => e.duration > 0);

      setActiveEffects(nextEffects);
      setTurns((t) => t + 1);

      // Discard current card and draw next one
      const nextCard = deck.drawCard(currentCard);
      setCurrentCard(nextCard);
    },
    [activeEffects, updateStats, checkObjectives, deck, currentCard]
  );

  const handleChoice = useCallback(
    (dir: "left" | "right") => {
      if (!currentCard) return;
      resolveTurn(dir === "left" ? currentCard.left : currentCard.right);
    },
    [currentCard, resolveTurn]
  );

  // Memoize the preview callback to avoid unnecessary re-renders
  const handlePreview = useCallback((side: "left" | "right" | null) => {
    setPreviewSide(side);
  }, []);

  // Calculate Diff for StatBars based on preview
  const currentDiffs = useMemo(() => {
    if (!previewSide || !currentCard) return [0, 0, 0, 0];

    const choice =
      previewSide === "left" ? currentCard.left : currentCard.right;

    return choice.effect;
  }, [previewSide, currentCard]);

  const cardKey = currentCard ? `card-${currentCard.id}-${turns}` : "no-card";

  const isMobile = useIsMobile();

  if (gameOver) {
    return (
      <GameOverScreen
        reason={gameOver}
        turns={turns}
        objectives={objectives}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  if (allCompleted) {
    return (
      <GameOverScreen
        reason="¡Has cumplido todos los objetivos del gobierno!"
        turns={turns}
        objectives={objectives}
        onRestart={handleRestart}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  return (
    <div className="crt h-dvh w-full flex flex-col items-center justify-between p-2 sm:p-4 relative font-tech select-none bg-[#1a1815] text-[#dcdcdc] overflow-hidden">
      {/* HUD: Stats */}
      <div className="w-full max-w-md bg-stone-800 p-1.5 sm:p-2 border-b-2 sm:border-b-4 border-red-900 z-10 shadow-lg">
        <div className="flex justify-between items-end mb-1 sm:mb-2">
          <h1 className="text-red-600 font-propaganda text-lg sm:text-2xl tracking-tighter">
            EL MODELO 2.0
          </h1>
          <div className="flex items-center gap-2">
            <span className="font-tech text-[8px] sm:text-[10px] text-stone-500">
              Cartas: {deck.availableCount}/{deck.totalCount}
            </span>
            <span className="font-tech text-[10px] sm:text-xs text-stone-400">
              TRIMESTRE: {turns}
            </span>
          </div>
        </div>

        <StatBar
          value={stats[0]}
          diff={currentDiffs[0]}
          activeEffects={activeEffects.filter((e) => e.stat === 0)}
          icon="users"
          color="text-blue-400"
          name="Opinión Pública"
          showAffects={false}
        />
        <StatBar
          value={stats[1]}
          diff={currentDiffs[1]}
          activeEffects={activeEffects.filter((e) => e.stat === 1)}
          icon="coins"
          color="text-green-400"
          name="Situación Económica"
          showAffects={false}
        />
        <StatBar
          value={stats[2]}
          diff={currentDiffs[2]}
          activeEffects={activeEffects.filter((e) => e.stat === 2)}
          icon="shield"
          color="text-gray-400"
          name="Defensa Nacional"
          showAffects={false}
        />
        <StatBar
          value={stats[3]}
          diff={currentDiffs[3]}
          activeEffects={activeEffects.filter((e) => e.stat === 3)}
          icon="megaphone"
          color="text-yellow-400"
          name="Gremialistas"
          showAffects={false}
        />
      </div>

      {/* HUD: Objectives */}
      <div className="w-full max-w-md mt-1 sm:mt-2 bg-stone-900/80 p-1.5 sm:p-2 border border-stone-700 z-10">
        <div className="text-[8px] sm:text-[10px] text-stone-500 uppercase tracking-widest mb-1">
          Objetivos del Gobierno
        </div>
        <div className="grid grid-cols-1 gap-1">
          {objectives.map((obj) => (
            <ObjectiveItem key={obj.id} obj={obj} />
          ))}
        </div>
      </div>

      {/* Notifications */}
      <motion.div
        className="absolute top-1/2 -translate-y-[120px] sm:-translate-y-[180px] w-full flex justify-center z-20 pointer-events-none px-2"
        key={`turnlog-${turns}`}
        animate={
          turnLog
            ? {
                opacity: [0, 1, 1, 0],
                transition: { duration: 2, times: [0, 0.1, 0.9, 1] },
              }
            : { opacity: 0 }
        }
      >
        {turnLog && (
          <div className="bg-stone-900 border border-amber-500 text-amber-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base font-bold font-typewriter shadow-xl effect-pill flex items-center gap-2">
            <Zap size={14} className="sm:w-4 sm:h-4" /> {turnLog}
          </div>
        )}
      </motion.div>

      {/* Card Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative overflow-hidden">
        {currentCard && (
          <CardView
            key={cardKey}
            data={currentCard}
            characters={characters}
            onResolve={handleChoice}
            onPreview={handlePreview}
          />
        )}
      </div>

      {/* Controls */}
      {currentCard && (
        <div className="w-full max-w-md grid grid-cols-2 gap-2 sm:gap-4 mb-2 sm:mb-4 z-10 px-2 sm:px-0">
          <button
            onClick={() => handleChoice("left")}
            onMouseEnter={() => handlePreview("left")}
            onMouseLeave={() => handlePreview(null)}
            className="cursor-pointer bg-stone-800 border-2 border-red-900 text-stone-300 p-2 sm:p-4 rounded hover:bg-red-900 hover:text-white transition-colors flex flex-col items-center group active:scale-95"
          >
            <ArrowLeft
              className="mb-0 sm:mb-1 group-hover:scale-110 transition-transform"
              size={24}
            />
          </button>
          <button
            onClick={() => handleChoice("right")}
            onMouseEnter={() => handlePreview("right")}
            onMouseLeave={() => handlePreview(null)}
            className="cursor-pointer bg-stone-800 border-2 border-green-900 text-stone-300 p-2 sm:p-4 rounded hover:bg-green-900 hover:text-white transition-colors flex flex-col items-center group active:scale-95"
          >
            <ArrowRight
              className="mb-0 sm:mb-1 group-hover:scale-110 transition-transform"
              size={24}
            />
          </button>
        </div>
      )}

      <div className="absolute bottom-1 sm:bottom-2 text-[8px] sm:text-[10px] text-stone-600 font-mono opacity-50 pointer-events-none">
        SISTEMA INTEGRADO DE GESTIÓN // v1.0 // STABLE
      </div>
    </div>
  );
}
