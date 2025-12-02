import { useEffect, useRef, useCallback, useState } from "react";

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
  typewriter: "/sounds/820352__bryansaraiva__typewriter-key-press-05.wav",
  // Los demás sonidos se agregarán cuando existan los archivos
  // "swipe-left": "/sounds/swipe.wav",
  // "swipe-right": "/sounds/swipe.wav",
  // "status-effect": "/sounds/status-effect.wav",
  // "special-effect": "/sounds/special-effect.wav",
  // "background-music": "/sounds/background-music.mp3",
};

// Singleton para compartir instancias de audio entre todos los componentes
const audioInstances = new Map<SoundType, HTMLAudioElement>();

// Pool de instancias de typewriter para reproducción simultánea
const typewriterPool: HTMLAudioElement[] = [];
const TYPEWRITER_POOL_SIZE = 3; // Número de instancias simultáneas
let typewriterPoolIndex = 0;

let initializationPromise: Promise<void> | null = null;

function initializeAudio() {
  if (initializationPromise) return initializationPromise;

  initializationPromise = new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    Object.entries(SOUND_PATHS).forEach(([type, path]) => {
      if (!path) return;

      try {
        // Para typewriter, crear un pool de instancias
        if (type === "typewriter") {
          for (let i = 0; i < TYPEWRITER_POOL_SIZE; i++) {
            const audio = new Audio(path);
            audio.preload = "auto";
            audio.volume = 0.5;

            audio.addEventListener("error", () => {
              // Error silencioso
            });

            typewriterPool.push(audio);
          }
        } else {
          // Para otros sonidos, usar instancia única
          if (audioInstances.has(type as SoundType)) return;

          const audio = new Audio(path);
          audio.preload = "auto";

          if (type === "background-music") {
            audio.loop = true;
          }

          audio.addEventListener("error", () => {
            // Error silencioso
          });

          audioInstances.set(type as SoundType, audio);
        }
      } catch {
        // Error silencioso al crear el audio
      }
    });

    resolve();
  });

  return initializationPromise;
}

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  const isInitialized = useRef(false);

  // Inicializar audio una sola vez
  useEffect(() => {
    if (!isInitialized.current) {
      initializeAudio();
      isInitialized.current = true;
    }
  }, []);

  // Actualizar volúmenes cuando cambian
  useEffect(() => {
    audioInstances.forEach((audio, type) => {
      if (type === "background-music") {
        audio.volume = isMuted ? 0 : musicVolume;
      } else {
        audio.volume = isMuted ? 0 : sfxVolume;
      }
    });

    // Actualizar volumen del pool de typewriter
    typewriterPool.forEach((audio) => {
      audio.volume = isMuted ? 0 : sfxVolume * 0.3;
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
        if (config?.loop !== undefined) {
          audio.loop = config.loop;
        }
        if (config?.playbackRate !== undefined) {
          audio.playbackRate = config.playbackRate;
        }

        // Reiniciar el audio si ya está reproduciéndose
        audio.currentTime = 0;

        // Play con manejo de errores
        audio.play().catch(() => {
          // Error silencioso - algunos navegadores bloquean autoplay
        });
      } catch (error) {
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
    } catch (error) {
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
    if (isMuted || typewriterPool.length === 0) return;

    try {
      // Obtener la siguiente instancia del pool (round-robin)
      const audio = typewriterPool[typewriterPoolIndex];
      typewriterPoolIndex = (typewriterPoolIndex + 1) % typewriterPool.length;

      // Variación aleatoria de pitch (playbackRate) entre 0.85 y 1.15
      const pitchVariation = 0.8 + Math.random() * 0.3;

      // Variación aleatoria de volumen entre 0.2 y 0.4 del volumen base de SFX
      const volumeVariation = (0.2 + Math.random() * 0.2) * sfxVolume;

      audio.volume = volumeVariation;
      audio.playbackRate = pitchVariation;
      audio.currentTime = 0;

      audio.play().catch(() => {
        // Error silencioso
      });
    } catch (error) {
      // Error silencioso
    }
  }, [isMuted, sfxVolume]);

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
