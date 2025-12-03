/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useRef } from "react";
import { isMobileDevice } from "@/lib/utils";

interface TypewriterOptions {
  speed?: number;
  charsPerTick?: number;
  charsPerTickMobile?: number;
}

export function useTypewriter(text: string, options?: TypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const textRef = useRef(text);

  useEffect(() => {
    if (textRef.current !== text) {
      textRef.current = text;
      setDisplayedText("");
      setIsComplete(false);
    }
  }, [text]);

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
