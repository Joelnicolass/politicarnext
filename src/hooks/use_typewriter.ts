/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { isMobileDevice } from "@/lib/utils";
import SoundManager from "@/services/sound_manager";

interface TypewriterOptions {
  speed?: number;
  charsPerTick?: number;
  charsPerTickMobile?: number;
}

export function useTypewriter(text: string, options?: TypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);

  // Efecto 1: Detectar cambio de texto y resetear
  useEffect(() => {
    if (textRef.current !== text) {
      textRef.current = text;
      setDisplayedText("");
      setIsComplete(false);
    }

    const playSound = async () => {
      const delay = (delayMs: number) =>
        new Promise((resolve) => setTimeout(resolve, delayMs));
      const SM = SoundManager.getInstance();

      SM.playTypewriter();
      await delay(200);
      SM.playTypewriter();
      await delay(200);
      SM.playTypewriter();
    };

    playSound();
  }, [text]);

  // Efecto 2: Animar el typewriter
  useEffect(() => {
    if (displayedText.length >= text.length) {
      if (!isComplete) {
        setIsComplete(true);
      }
      return;
    }

    const speed = options?.speed ?? 30;
    const isMobile = isMobileDevice();

    const charsPerTick = isMobile
      ? options?.charsPerTickMobile ?? 4
      : options?.charsPerTick ?? 1;

    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length >= text.length) return prev;

        const nextIndex = Math.min(prev.length + charsPerTick, text.length);

        return text.slice(0, nextIndex);
      });
    }, speed);

    return () => clearInterval(interval);
  }, [
    text,
    displayedText.length,
    isComplete,
    options?.speed,
    options?.charsPerTick,
    options?.charsPerTickMobile,
  ]);

  return { displayedText, isComplete };
}
