"use client";

import { Objective } from "@/types";

export const GameOverScreen = ({
  reason,
  turns,
  objectives,
  onRestart,
  onBackToMenu,
}: {
  reason: string;
  turns: number;
  objectives: Objective[];
  onRestart: () => void;
  onBackToMenu?: () => void;
}) => {
  const completedCount = objectives.filter(
    (o: Objective) => o.completed
  ).length;
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-stone-900 p-4 sm:p-8 text-center animate-fade-in">
      <div className="border-2 sm:border-4 border-red-800 p-4 sm:p-6 bg-stone-800 shadow-2xl max-w-md w-full relative">
        <h1 className="text-3xl sm:text-5xl text-red-600 font-propaganda mb-3 sm:mb-4 uppercase tracking-tighter">
          FIN DEL CICLO
        </h1>
        <div className="font-typewriter text-amber-100 text-base sm:text-lg mb-4 sm:mb-6 py-3 sm:py-4 border-y border-stone-600">
          {reason}
        </div>
        <div className="bg-stone-900 p-3 sm:p-4 mb-4 sm:mb-6 border border-stone-700">
          <div className="text-stone-400 font-mono mb-2 text-xs sm:text-sm uppercase tracking-widest">
            Informe de Gestión
          </div>
          <div className="flex justify-between text-white font-bold mb-1 text-sm sm:text-base">
            <span>DURACIÓN:</span> <span>{turns} TRIMESTRES</span>
          </div>
          <div className="flex justify-between text-white font-bold text-sm sm:text-base">
            <span>OBJETIVOS:</span>{" "}
            <span
              className={
                completedCount === 3 ? "text-green-500" : "text-amber-500"
              }
            >
              {completedCount} / 3
            </span>
          </div>
        </div>
        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={onRestart}
            className="bg-red-900 hover:bg-red-700 text-amber-100 font-bold py-2.5 sm:py-3 px-6 sm:px-8 w-full font-propaganda text-lg sm:text-xl transition-all"
          >
            REINTENTAR
          </button>
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="bg-stone-700 hover:bg-stone-600 text-amber-100 font-bold py-2.5 sm:py-3 px-6 sm:px-8 w-full font-propaganda text-base sm:text-lg transition-all"
            >
              VOLVER AL MENÚ
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
