import { useState, useEffect, useRef, useMemo } from "react";

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
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Actualizar la ref cuando cambien las opciones
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  // Memoizar el texto para evitar re-renders innecesarios
  const memoizedText = useMemo(() => text, [text]);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    let currentIndex = 0;
    let lastTime = performance.now();

    const typeNextChar = (currentTime: number) => {
      const elapsed = currentTime - lastTime;

      if (elapsed >= speed) {
        if (currentIndex < memoizedText.length) {
          const newText = memoizedText.slice(0, currentIndex + 1);

          // Usar requestIdleCallback si está disponible, sino requestAnimationFrame
          if ("requestIdleCallback" in window) {
            requestIdleCallback(
              () => {
                setDisplayedText(newText);
              },
              { timeout: speed }
            );
          } else {
            setDisplayedText(newText);
          }

          // Llamar al callback de sonido si está habilitado
          const opts = optionsRef.current;
          const addedChar = memoizedText[currentIndex];
          if (
            opts?.playSound &&
            opts?.onTypeLetter &&
            addedChar &&
            addedChar.trim()
          ) {
            // Llamar al sonido de forma asíncrona para no bloquear
            queueMicrotask(() => {
              try {
                opts.onTypeLetter?.(addedChar, currentIndex);
              } catch (error) {
                console.warn("Error playing typewriter sound:", error);
              }
            });
          }

          currentIndex++;
          lastTime = currentTime;
        } else {
          setIsComplete(true);
          return; // Detener la animación
        }
      }

      // Continuar la animación
      animationFrameRef.current = requestAnimationFrame(typeNextChar);
    };

    // Iniciar la animación
    animationFrameRef.current = requestAnimationFrame(typeNextChar);

    return () => {
      // Cancelar la animación al desmontar
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [memoizedText, speed]);

  return { displayedText, isComplete };
}
