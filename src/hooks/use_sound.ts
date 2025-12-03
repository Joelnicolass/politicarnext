import { useEffect, useCallback, useState } from "react";

export type SoundType =
  | "typewriter"
  | "swipe-left"
  | "swipe-right"
  | "status-effect"
  | "special-effect"
  | "background-music";

interface SoundConfig {
  volume?: number;
  loop?: boolean;
  playbackRate?: number;
}

const SOUND_PATHS: Partial<Record<SoundType, string>> = {
  typewriter: "/sounds/typewriter_1.wav",
  // Los demás sonidos se agregarán cuando existan los archivos
  // "swipe-left": "/sounds/swipe.wav",
  // "swipe-right": "/sounds/swipe.wav",
  // "status-effect": "/sounds/status-effect.wav",
  // "special-effect": "/sounds/special-effect.wav",
  // "background-music": "/sounds/background-music.mp3",
};

// UNA SOLA instancia de audio por tipo - mucho más performante
const audioInstances = new Map<SoundType, HTMLAudioElement>();
let isInitialized = false;

function initializeAudio() {
  if (isInitialized || typeof window === "undefined") return;

  Object.entries(SOUND_PATHS).forEach(([type, path]) => {
    if (!path) return;

    try {
      const audio = new Audio(path);
      audio.preload = "auto";

      if (type === "background-music") {
        audio.loop = true;
      }

      audioInstances.set(type as SoundType, audio);
    } catch {
      // Error silencioso
    }
  });

  isInitialized = true;
}

// Inicializar cuando se carga el módulo - en idle para no bloquear
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    requestIdleCallback(initializeAudio);
  } else {
    setTimeout(initializeAudio, 100);
  }
}

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [sfxVolume, setSfxVolume] = useState(0.5);

  // Actualizar volúmenes cuando cambian
  useEffect(() => {
    audioInstances.forEach((audio, type) => {
      if (type === "background-music") {
        audio.volume = isMuted ? 0 : musicVolume;
      } else {
        audio.volume = isMuted ? 0 : sfxVolume;
      }
    });
  }, [isMuted, musicVolume, sfxVolume]);

  const play = useCallback(
    (soundType: SoundType, config?: SoundConfig) => {
      if (isMuted) return;

      const audio = audioInstances.get(soundType);
      if (!audio) return;

      try {
        // Aplicar configuración personalizada
        if (config?.volume !== undefined) {
          audio.volume = config.volume;
        }
        if (config?.playbackRate !== undefined) {
          audio.playbackRate = config.playbackRate;
        }
        if (config?.loop !== undefined) {
          audio.loop = config.loop;
        }

        // Para sonidos cortos como typewriter, permitir superposición reiniciando
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Error silencioso
        });
      } catch {
        // Error silencioso
      }
    },
    [isMuted]
  );

  const stop = useCallback((soundType: SoundType) => {
    const audio = audioInstances.get(soundType);
    if (!audio) return;

    try {
      audio.pause();
      audio.currentTime = 0;
    } catch {
      // Error silencioso
    }
  }, []);

  const playSwipe = useCallback(
    (direction: "left" | "right") => {
      const soundType: SoundType =
        direction === "left" ? "swipe-left" : "swipe-right";
      play(soundType);
    },
    [play]
  );

  const playTypewriter = useCallback(() => {
    if (isMuted) return;

    // Variación aleatoria de pitch (playbackRate) entre 0.9 y 1.1 (menos extremo = más performante)
    const pitchVariation = 0.9 + Math.random() * 0.2;

    // Variación aleatoria de volumen entre 0.25 y 0.35 del volumen base de SFX
    const volumeVariation = (0.25 + Math.random() * 0.1) * sfxVolume;

    play("typewriter", {
      volume: volumeVariation,
      playbackRate: pitchVariation,
    });
  }, [isMuted, sfxVolume, play]);

  const playStatusEffect = useCallback(() => {
    play("status-effect");
  }, [play]);

  const playSpecialEffect = useCallback(() => {
    play("special-effect");
  }, [play]);

  const playBackgroundMusic = useCallback(() => {
    play("background-music", { loop: true, volume: musicVolume });
  }, [play, musicVolume]);

  const stopBackgroundMusic = useCallback(() => {
    stop("background-music");
  }, [stop]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return {
    // Métodos de reproducción
    play,
    stop,
    playSwipe,
    playTypewriter,
    playStatusEffect,
    playSpecialEffect,
    playBackgroundMusic,
    stopBackgroundMusic,

    // Estado y controles
    isMuted,
    toggleMute,
    setIsMuted,

    // Volúmenes
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
  };
}
