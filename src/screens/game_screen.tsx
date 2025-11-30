"use client";

import { ArrowLeft, ArrowRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardData, Character, Objective } from "@/types";
import { CardView } from "@/components/card_view";
import { GameOverScreen } from "@/components/game_over";
import { ObjectiveItem } from "@/components/objectives_item";
import { StatBar } from "@/components/stats_bar";
import { motion } from "framer-motion";
import { APP_NAME } from "@/utils/constants";
import {
  GameManagerProvider,
  useGameManager,
} from "@/providers/game_manager.provider";
import { AppVersion } from "@/components";

interface GameScreenProps {
  cards: CardData[];
  characters: Record<string, Character>;
  objectivesPool: Omit<Objective, "completed">[];
  difficulty: "easy" | "medium" | "hard";
}

function GameContent() {
  const router = useRouter();
  const { state, handleChoice, handlePreview, resetGame, deckInfo } =
    useGameManager();

  const handleBackToMenu = () => {
    router.push("/");
  };

  const cardKey = state.currentCard
    ? `card-${state.currentCard.id}-${state.turns}`
    : "no-card";

  // Game over state
  if (state.gameOver) {
    return (
      <GameOverScreen
        reason={state.gameOver}
        turns={state.turns}
        objectives={state.objectives}
        onRestart={resetGame}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  // All objectives completed
  if (state.allObjectivesCompleted) {
    return (
      <GameOverScreen
        reason="¡Has cumplido todos los objetivos del gobierno!"
        turns={state.turns}
        objectives={state.objectives}
        onRestart={resetGame}
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
            {APP_NAME}
          </h1>
          <div className="flex items-center gap-2">
            <span className="font-tech text-[8px] sm:text-[10px] text-stone-500">
              Cartas: {deckInfo.availableCount}/{deckInfo.totalCount}
            </span>
            <span className="font-tech text-[10px] sm:text-xs text-stone-400">
              TRIMESTRE: {state.turns}
            </span>
          </div>
        </div>

        <StatBar
          value={state.stats[0]}
          diff={state.previewDiffs[0]}
          activeEffects={state.activeEffects.filter((e) => e.stat === 0)}
          icon="users"
          color="text-blue-400"
          name="Opinión Pública"
          showAffects={false}
        />
        <StatBar
          value={state.stats[1]}
          diff={state.previewDiffs[1]}
          activeEffects={state.activeEffects.filter((e) => e.stat === 1)}
          icon="coins"
          color="text-green-400"
          name="Situación Económica"
          showAffects={false}
        />
        <StatBar
          value={state.stats[2]}
          diff={state.previewDiffs[2]}
          activeEffects={state.activeEffects.filter((e) => e.stat === 2)}
          icon="shield"
          color="text-gray-400"
          name="Defensa Nacional"
          showAffects={false}
        />
        <StatBar
          value={state.stats[3]}
          diff={state.previewDiffs[3]}
          activeEffects={state.activeEffects.filter((e) => e.stat === 3)}
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
          {state.objectives.map((obj) => (
            <ObjectiveItem key={obj.id} obj={obj} />
          ))}
        </div>
      </div>

      {/* Notifications */}
      <motion.div
        className="absolute top-1/2 -translate-y-[120px] sm:-translate-y-[180px] w-full flex justify-center z-20 pointer-events-none px-2"
        key={`turnlog-${state.turns}`}
        animate={
          state.turnLog
            ? {
                opacity: [0, 1, 1, 0],
                transition: { duration: 2, times: [0, 0.1, 0.9, 1] },
              }
            : { opacity: 0 }
        }
      >
        {state.turnLog && (
          <div className="bg-stone-900 border border-amber-500 text-amber-500 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-base font-bold font-typewriter shadow-xl effect-pill flex items-center gap-2">
            <Zap size={14} className="sm:w-4 sm:h-4" /> {state.turnLog}
          </div>
        )}
      </motion.div>

      {/* Card Area */}
      <div className="flex-1 w-full flex flex-col items-center justify-center relative overflow-hidden">
        {state.currentCard && (
          <CardView
            key={cardKey}
            data={state.currentCard}
            characters={state.characters}
            onResolve={handleChoice}
            onPreview={handlePreview}
          />
        )}
      </div>

      {/* Controls */}
      {state.currentCard && (
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

      <AppVersion />
    </div>
  );
}

export default function GameScreen({
  cards,
  characters,
  objectivesPool,
  difficulty,
}: GameScreenProps) {
  return (
    <GameManagerProvider
      cards={cards}
      characters={characters}
      objectivesPool={objectivesPool}
      difficulty={difficulty}
    >
      <GameContent />
    </GameManagerProvider>
  );
}
