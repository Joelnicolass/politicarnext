"use client";

import { useState, useCallback, useMemo } from "react";

export const useGameStats = () => {
  const [stats, setStats] = useState<number[]>([50, 50, 50, 50]); // [pueblo, reservas, orden, sindicatos]

  const updateStats = useCallback((delta: number[]) => {
    setStats((prev) =>
      prev.map((val, idx) => Math.min(100, Math.max(0, val + delta[idx])))
    );
  }, []);

  const resetStats = useCallback(() => {
    setStats([50, 50, 50, 50]);
  }, []);

  // Calcular gameOver como estado derivado usando useMemo
  const gameOver = useMemo(() => {
    const [pueblo, reservas, orden, sindicatos] = stats;

    if (pueblo <= 0)
      return "La gente rodeó la Rosada con antorchas. Te vas en helicóptero.";
    if (pueblo >= 100)
      return "Te nombran Emperador de la Polenta. Fin de la República.";
    if (reservas <= 0)
      return "Quiebra total. El país se vende por partes en MercadoLibre.";
    if (reservas >= 100)
      return "¡Sobran dólares! Compras Uruguay y te retiras.";
    if (orden <= 0)
      return "Ley de la Selva. El Ministro de Economía es el más fuerte.";
    if (orden >= 100)
      return "Gran Hermano es real. Nadie se mueve sin permiso.";
    if (sindicatos <= 0)
      return "Paro indeterminado por aburrimiento. Nadie trabaja.";
    if (sindicatos >= 100)
      return "El Sindicato de Camioneros te expropió el sillón.";

    return null;
  }, [stats]);

  return { stats, gameOver, updateStats, resetStats };
};
