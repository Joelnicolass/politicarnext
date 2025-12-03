"use client";

import { useEffect, useRef, useCallback } from "react";
import { isMobileDevice } from "@/lib/utils";
import SoundManager from "@/services/sound_manager";

interface TypewriterCanvasProps {
  text: string;
  speed?: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  playSound?: boolean;
  className?: string;
}

export function TypewriterCanvas({
  text,
  speed = 30,
  fontSize = 14,
  fontFamily = "Special Elite",
  color = "#1c1917",
  playSound = false,
  className = "",
}: TypewriterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const currentIndexRef = useRef(0);
  const lastTimeRef = useRef(0);
  const soundManagerRef = useRef<SoundManager | null>(null);

  // Función auxiliar para word wrap - usar useCallback para memorización
  const wrapText = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      text: string,
      maxWidth: number
    ): string[] => {
      const words = text.split(" ");
      const lines: string[] = [];
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine + (currentLine ? " " : "") + word;
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        lines.push(currentLine);
      }

      return lines;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    // Esperar a que la fuente esté cargada antes de continuar
    const initCanvas = async () => {
      // Verificar que la fuente Special Elite esté cargada
      if (document.fonts) {
        await document.fonts.load(`400 ${fontSize}px "Special Elite"`);
      }

      // Configurar DPI para pantallas de alta resolución
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Configuración de fuente - con bold para que coincida con el original
      ctx.font = `700 ${fontSize}px "${fontFamily}", cursive`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Configuración de performance
      const isMobile = isMobileDevice();
      const charsPerTick = isMobile ? 4 : 1;
      const shouldPlaySound = playSound; //&& !isMobile;

      // Obtener SoundManager solo si vamos a usar sonido
      if (shouldPlaySound && !soundManagerRef.current) {
        soundManagerRef.current = SoundManager.getInstance();
      }

      // Reset
      currentIndexRef.current = 0;
      lastTimeRef.current = 0;

      // Función de animación
      const animate = (timestamp: number) => {
        if (!lastTimeRef.current) lastTimeRef.current = timestamp;
        const elapsed = timestamp - lastTimeRef.current;

        if (elapsed >= speed) {
          // Limpiar canvas
          ctx.clearRect(0, 0, rect.width, rect.height);

          // Calcular próximo índice
          const nextIndex = Math.min(
            currentIndexRef.current + charsPerTick,
            text.length
          );

          // Obtener texto a mostrar
          const displayText = text.slice(0, nextIndex);

          // Dibujar texto con word wrap simple
          const maxWidth = rect.width - 20;
          const lines = wrapText(ctx, displayText, maxWidth);
          const lineHeight = fontSize * 1.4;
          const totalHeight = lines.length * lineHeight;
          const startY = rect.height / 2 - totalHeight / 2;

          lines.forEach((line, i) => {
            ctx.fillText(line, rect.width / 2, startY + i * lineHeight);
          });

          // Dibujar cursor si no está completo
          if (nextIndex < text.length) {
            const lastLine = lines[lines.length - 1] || "";
            const cursorX =
              rect.width / 2 + ctx.measureText(lastLine).width / 2 + 5;
            const cursorY = startY + (lines.length - 1) * lineHeight;

            // Cursor parpadeante
            if (Math.floor(timestamp / 500) % 2 === 0) {
              ctx.fillText("|", cursorX, cursorY);
            }
          }

          // Reproducir sonido si avanzamos y es un carácter válido
          if (
            shouldPlaySound &&
            soundManagerRef.current &&
            currentIndexRef.current % 3 === 0
          ) {
            for (let i = currentIndexRef.current; i < nextIndex; i++) {
              const char = text[i];
              if (char && char.trim()) {
                soundManagerRef.current.playTypewriter();
                break; // Solo un sonido por tick
              }
            }
          }

          currentIndexRef.current = nextIndex;
          lastTimeRef.current = timestamp;
        }

        // Continuar animación si no terminó
        if (currentIndexRef.current < text.length) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Redibujar una vez más sin cursor
          ctx.clearRect(0, 0, rect.width, rect.height);
          const lines = wrapText(ctx, text, rect.width - 20);
          const lineHeight = fontSize * 1.4;
          const totalHeight = lines.length * lineHeight;
          const startY = rect.height / 2 - totalHeight / 2;
          lines.forEach((line, i) => {
            ctx.fillText(line, rect.width / 2, startY + i * lineHeight);
          });
        }
      };

      // Iniciar animación
      animationRef.current = requestAnimationFrame(animate);
    };

    initCanvas();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, speed, fontSize, fontFamily, color, playSound, wrapText]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
