import { useState, useEffect, useRef } from "react";

export function useTypewriter(
  text: string,
  speed: number = 30,
  options?: {
    playSound?: boolean;
    onTypeLetter?: (letter: string, index: number) => void;
  }
) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const optionsRef = useRef(options);

  // Actualizar la ref cuando cambien las opciones
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        const newText = text.slice(0, currentIndex + 1);
        setDisplayedText(newText);

        // Llamar al callback de sonido si está habilitado
        // Solo reproducir si agregamos una nueva letra (no espacio)
        const opts = optionsRef.current;
        const addedChar = text[currentIndex];
        if (
          opts?.playSound &&
          opts?.onTypeLetter &&
          addedChar &&
          addedChar.trim()
        ) {
          try {
            opts.onTypeLetter(text[currentIndex], currentIndex);
          } catch (error) {
            console.warn("Error playing typewriter sound:", error);
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
