import { useState, useEffect, useRef } from "react";

export function useTypewriter(
  text: string,
  speed: number = 30,
  options?: {
    playSound?: boolean;
    onTypeLetter?: (letter: string, index: number) => void;
    soundThrottle?: number; // Reproducir sonido cada N letras (por defecto 2)
  }
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const optionsRef = useRef(options);
  const soundCounterRef = useRef(0);

  // Actualizar la ref cuando cambien las opciones
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    soundCounterRef.current = 0;
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        const newText = text.slice(0, currentIndex + 1);
        setDisplayedText(newText);

        // Llamar al callback de sonido con throttling
        const opts = optionsRef.current;
        const addedChar = text[currentIndex];
        const throttle = opts?.soundThrottle ?? 2; // Por defecto cada 2 letras

        if (
          opts?.playSound &&
          opts?.onTypeLetter &&
          addedChar &&
          addedChar.trim()
        ) {
          soundCounterRef.current++;

          // Solo reproducir sonido cada N letras para mejor rendimiento
          if (soundCounterRef.current >= throttle) {
            soundCounterRef.current = 0;
            try {
              opts.onTypeLetter(addedChar, currentIndex);
            } catch (error) {
              console.warn("Error playing typewriter sound:", error);
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
  }, [text, speed]);

  return { displayedText, isComplete };
}
