import { useState, useEffect } from "react";
import SoundManager from "@/services/sound_manager";

// Detectar si es móvil de forma simple y performante
const isMobileDevice = () => {
  if (typeof window === "undefined") return false;
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768
  );
};

export function useTypewriter(
  text: string,
  speed: number = 30,
  options?: {
    playSound?: boolean;
  }
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;

    // En móviles, deshabilitar sonidos completamente para mejor performance
    const isMobile = isMobileDevice();
    const shouldPlaySound = options?.playSound && !isMobile;

    // Obtener la instancia única del SoundManager solo si vamos a usar sonido
    const soundManager = shouldPlaySound ? SoundManager.getInstance() : null;

    // Contador para throttling de sonidos (solo en desktop)
    let soundCounter = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));

        // Reproducir sonido solo en desktop y con throttling (cada 2 letras)
        if (shouldPlaySound && soundManager) {
          const char = text[currentIndex];
          if (char && char.trim()) {
            soundCounter++;
            // Solo reproducir cada 2 letras para reducir carga
            if (soundCounter >= 2) {
              soundCounter = 0;
              soundManager.playTypewriter();
            }
          }
        }

        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, options?.playSound]);

  return { displayedText, isComplete };
}
