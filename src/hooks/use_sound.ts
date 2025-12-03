import { useEffect, useCallback, useState, useTransition } from "react";

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
  typewriter: "/sounds/typewriter_2.wav",
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
const TYPEWRITER_POOL_SIZE = 2; // Reducido para mejor rendimiento
let typewriterPoolIndex = 0;

// Cola de sonidos pendientes para procesar en batch
const soundQueue: Array<() => void> = [];
let isProcessingQueue = false;

// Procesar la cola de sonidos en el siguiente frame
function processSoundQueue() {
  if (isProcessingQueue || soundQueue.length === 0) return;

  isProcessingQueue = true;

  requestAnimationFrame(() => {
    const batch = soundQueue.splice(0, 3); // Procesar máximo 3 sonidos por frame
    batch.forEach((fn) => fn());
    isProcessingQueue = false;

    // Si quedan más sonidos, programar el siguiente batch
    if (soundQueue.length > 0) {
      processSoundQueue();
    }
  });
}

function initializeAudio() {
  if (typeof window === "undefined") return;

  Object.entries(SOUND_PATHS).forEach(([type, path]) => {
    if (!path) return;

    try {
      // Para typewriter, crear un pool de instancias
      if (type === "typewriter") {
        for (let i = 0; i < TYPEWRITER_POOL_SIZE; i++) {
          const audio = new Audio(path);
          audio.preload = "auto";

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
}

// Inicializar una sola vez cuando se carga el módulo
if (typeof window !== "undefined") {
  initializeAudio();
}

export function useSound() {
  const [isMuted, setIsMuted] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.3);
  const [sfxVolume, setSfxVolume] = useState(0.5);
  const [isPending, startTransition] = useTransition();

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
    if (isMuted || typewriterPool.length === 0) return;

    // Agregar a la cola en lugar de reproducir inmediatamente
    soundQueue.push(() => {
      try {
        // Obtener la siguiente instancia del pool (round-robin)
        const audio = typewriterPool[typewriterPoolIndex];
        typewriterPoolIndex = (typewriterPoolIndex + 1) % typewriterPool.length;

        const pitchVariation = 1 + Math.random() * 0.2;
        const volumeVariation = (0.2 + Math.random() * 0.1) * sfxVolume;

        audio.volume = volumeVariation;
        audio.playbackRate = pitchVariation;
        audio.currentTime = 0;

        audio.play().catch(() => {
          // Error silencioso
        });
      } catch {
        // Error silencioso
      }
    });

    // Procesar la cola de forma no bloqueante
    processSoundQueue();
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
    startTransition(() => {
      setIsMuted((prev) => !prev);
    });
  }, [startTransition]);

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
    isPending, // Para mostrar indicador de carga si es necesario

    // Volúmenes
    musicVolume,
    setMusicVolume,
    sfxVolume,
    setSfxVolume,
  };
}
