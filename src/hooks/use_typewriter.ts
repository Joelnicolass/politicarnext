import { useState, useEffect } from "react";
import SoundManager from "@/services/sound_manager";

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

    // Obtener la instancia única del SoundManager
    const soundManager = SoundManager.getInstance();

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));

        if (currentIndex % 2 === 0) {
          currentIndex++;
          return;
        }

        // Reproducir sonido si está habilitado
        if (options?.playSound) {
          const char = text[currentIndex];
          // Solo reproducir en caracteres válidos (no espacios)
          if (char && char.trim()) {
            soundManager.playTypewriter();
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
