/**
 * SoundManager - Singleton para gestionar todos los sonidos del juego
 * Una sola instancia en toda la aplicación = máxima performance
 */

type SoundType = "typewriter" | "swipe" | "background" | "effect";

class SoundManager {
  private static instance: SoundManager | null = null;
  private audioInstances: Map<SoundType, HTMLAudioElement> = new Map();
  private isInitialized = false;
  private isMuted = false;

  private constructor() {
    // Constructor privado para el patrón singleton
    if (typeof window !== "undefined") {
      this.initialize();
    }
  }

  /**
   * Obtener la instancia única del SoundManager
   */
  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  /**
   * Inicializar las instancias de audio
   */
  private initialize(): void {
    if (this.isInitialized) return;

    try {
      // Crear UNA SOLA instancia de audio para typewriter
      const typewriterAudio = new Audio("/sounds/typewriter_1.wav");
      typewriterAudio.preload = "auto";
      typewriterAudio.volume = 0.3;
      this.audioInstances.set("typewriter", typewriterAudio);

      this.isInitialized = true;
    } catch {
      console.warn("Error inicializando SoundManager");
    }
  }

  /**
   * Reproducir sonido de typewriter con variación de pitch
   */
  public playTypewriter(): void {
    if (this.isMuted) return;

    const audio = this.audioInstances.get("typewriter");
    if (!audio) return;

    try {
      // Variación de pitch entre 0.9 y 1.1
      audio.playbackRate = 0.9 + Math.random() * 0.2;

      // Variación de volumen entre 0.2 y 0.35
      audio.volume = 0.2 + Math.random() * 0.15;

      // Clonar el audio y reproducir el clon para permitir superposición
      // Esto es más eficiente que crear un pool
      const clone = audio.cloneNode() as HTMLAudioElement;
      clone.volume = audio.volume;
      clone.playbackRate = audio.playbackRate;

      clone.play().catch(() => {
        // Error silencioso - navegador puede bloquear autoplay
      });

      // Limpiar el clon después de que termine
      clone.onended = () => {
        clone.src = "";
      };
    } catch {
      // Error silencioso
    }
  }

  /**
   * Alternar mute/unmute
   */
  public toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  /**
   * Establecer estado de mute
   */
  public setMuted(muted: boolean): void {
    this.isMuted = muted;
  }

  /**
   * Obtener estado de mute
   */
  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Limpiar recursos (solo si es necesario destruir la instancia)
   */
  public cleanup(): void {
    this.audioInstances.forEach((audio) => {
      audio.pause();
      audio.src = "";
    });
    this.audioInstances.clear();
    this.isInitialized = false;
  }
}

export default SoundManager;
