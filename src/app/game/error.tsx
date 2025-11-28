"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#1a1815]">
      <div className="text-center max-w-md p-8">
        <h2 className="font-propaganda text-2xl text-red-600 mb-4">
          ¡ERROR DEL SISTEMA!
        </h2>
        <p className="font-typewriter text-stone-400 mb-6">
          No se pudo cargar la partida.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-red-900 hover:bg-red-800 text-white font-tech px-6 py-3 rounded border-2 border-red-700 transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/deck-selection"
            className="bg-stone-700 hover:bg-stone-600 text-white font-tech px-6 py-3 rounded border-2 border-stone-600 transition-colors"
          >
            Volver
          </Link>
        </div>
      </div>
    </div>
  );
}
