"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import SoundManager from "@/services/sound_manager";

interface SoundContextType {
  soundManager: SoundManager;
  isMuted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [soundManager] = useState(() => SoundManager.getInstance());
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    soundManager.toggleMute();
    setIsMuted(soundManager.getMuted());
  };

  useEffect(() => {
    // Sincronizar estado inicial
    setIsMuted(soundManager.getMuted());
  }, [soundManager]);

  return (
    <SoundContext.Provider value={{ soundManager, isMuted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

/**
 * Hook para acceder al SoundManager en cualquier componente
 */
export function useSoundManager() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSoundManager debe usarse dentro de SoundProvider");
  }
  return context;
}
