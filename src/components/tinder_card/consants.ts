// ==================== ENUMS ====================

/**
 * Dirección del swipe en la tarjeta tipo Tinder.
 * Define hacia qué lado se desliza la tarjeta.
 */
export enum SwipeDirection {
  LEFT = "left",
  RIGHT = "right",
}

/**
 * Eje de arrastre permitido para el componente de arrastre.
 */
export enum DragAxis {
  X = "x",
  Y = "y",
}

// ==================== TIPOS ====================

/**
 * Tipo que representa un lado de swipe válido.
 * Solo puede ser LEFT o RIGHT.
 */
export type SwipeSide = SwipeDirection.LEFT | SwipeDirection.RIGHT;

/**
 * Tipo que representa un lado de swipe o null.
 * Útil para el estado de preview donde puede no haber dirección activa.
 */
export type SwipeSideOrNull = SwipeSide | null;

// ==================== TRANSFORMACIONES DE ANIMACIÓN ====================

/**
 * Rangos de entrada y salida para las transformaciones de Framer Motion.
 * Estas constantes definen cómo se mapean los valores de posición X a otras propiedades visuales.
 */
export const TRANSFORM_RANGES = {
  /**
   * Rango de entrada para el valor X en píxeles [-200, 200].
   * Define el rango de movimiento horizontal que se considera para las transformaciones.
   */
  X_INPUT: [-200, 200],

  /**
   * Rango de salida para la rotación en grados [-25, 25].
   * La tarjeta rota hasta 25° cuando se arrastra completamente.
   */
  ROTATION_OUTPUT: [-25, 25],

  /**
   * Rango de entrada para la opacidad del indicador derecho [0, 150].
   * El indicador comienza a aparecer cuando X es positivo.
   */
  OPACITY_RIGHT_INPUT: [0, 150],

  /**
   * Rango de salida para la opacidad del indicador derecho [0, 1].
   * Va de invisible (0) a completamente visible (1).
   */
  OPACITY_RIGHT_OUTPUT: [0, 1],

  /**
   * Rango de entrada para la opacidad del indicador izquierdo [-150, 0].
   * El indicador comienza a aparecer cuando X es negativo.
   */
  OPACITY_LEFT_INPUT: [-150, 0],

  /**
   * Rango de salida para la opacidad del indicador izquierdo [1, 0].
   * Va de completamente visible (1) a invisible (0).
   */
  OPACITY_LEFT_OUTPUT: [1, 0],
};

// ==================== ANIMACIÓN DE SALIDA ====================

/**
 * Configuración para la animación cuando la tarjeta sale de la pantalla.
 * Se aplica cuando el usuario hace swipe y la decisión se confirma.
 */
export const EXIT_ANIMATION = {
  /**
   * Distancia en píxeles que la tarjeta recorre al salir (500px).
   * Suficientemente lejos para que salga completamente del viewport.
   */
  DISTANCE: 500,

  /**
   * Opacidad final cuando la tarjeta sale (0 = invisible).
   * La tarjeta se desvanece mientras se aleja.
   */
  OPACITY: 0,

  /**
   * Duración de la animación en segundos (0.2s).
   * Animación rápida para mantener la fluidez de la interacción.
   */
  DURATION: 0.2,

  /**
   * Duración reducida para usuarios con preferencia de movimiento reducido (0.1s).
   * Respeta las preferencias de accesibilidad del sistema.
   */
  REDUCED_MOTION_DURATION: 0.1,
} as const;

// ==================== ANIMACIÓN DE ENTRADA ====================

/**
 * Configuración para la animación cuando la tarjeta entra a la pantalla.
 * Se aplica cuando una nueva tarjeta aparece en el deck.
 */
export const ENTRY_ANIMATION = {
  /**
   * Escala final cuando la tarjeta entra (1 = tamaño normal).
   * La tarjeta crece desde 0.8 hasta su tamaño completo.
   */
  SCALE: 1,

  /**
   * Opacidad final cuando la tarjeta entra (1 = completamente visible).
   * La tarjeta se materializa gradualmente.
   */
  OPACITY: 1,

  /**
   * Posición X final cuando la tarjeta entra (0 = centrada).
   * La tarjeta termina en el centro de la pantalla.
   */
  X: 0,

  /**
   * Rigidez del resorte para la animación (260).
   * Un valor alto crea una animación más enérgica y rápida.
   */
  SPRING_STIFFNESS: 260,

  /**
   * Amortiguación del resorte (20).
   * Controla cuánto rebote tiene la animación, valor más bajo = más rebote.
   */
  SPRING_DAMPING: 20,
} as const;

// ==================== ANIMACIÓN DE RETORNO ====================

/**
 * Configuración para la animación cuando la tarjeta vuelve a su posición original.
 * Se aplica cuando el usuario suelta la tarjeta sin completar el swipe.
 */
export const RETURN_ANIMATION = {
  /**
   * Posición X de retorno (0 = centro).
   * La tarjeta vuelve a su posición centrada original.
   */
  X: 0,

  /**
   * Duración reducida para el retorno con movimiento reducido (0.2s).
   * Transición simple sin física de resorte para accesibilidad.
   */
  REDUCED_MOTION_DURATION: 0.2,

  /**
   * Rigidez del resorte para el retorno (300).
   * Más rígido que la entrada para un retorno más rápido y decidido.
   */
  SPRING_STIFFNESS: 300,

  /**
   * Amortiguación del resorte para el retorno (20).
   * Mismo valor que entrada, mantiene consistencia en el rebote.
   */
  SPRING_DAMPING: 20,
} as const;

// ==================== UMBRALES DE DETECCIÓN ====================

/**
 * Umbrales por defecto para la detección de gestos de swipe.
 * Estos valores determinan cuándo un arrastre se convierte en una decisión.
 */
export const DEFAULT_THRESHOLDS = {
  /**
   * Umbral de distancia para confirmar el drag en píxeles (100px).
   * Si la tarjeta se arrastra más de 100px, se considera una decisión.
   */
  DRAG: 100,

  /**
   * Umbral de velocidad para confirmar el swipe en px/s (500px/s).
   * Un swipe rápido cuenta como decisión incluso con menos distancia.
   */
  VELOCITY: 500,

  /**
   * Umbral para mostrar el preview de la decisión en píxeles (50px).
   * Los indicadores visuales aparecen después de 50px de movimiento.
   */
  PREVIEW: 50,
} as const;

// ==================== CONFIGURACIÓN DEL DRAG ====================

/**
 * Configuración de comportamiento para el arrastre de la tarjeta.
 * Define física y límites del gesto de arrastre.
 */
export const DRAG_CONFIG = {
  /**
   * Límites del arrastre en píxeles.
   * left: 0 y right: 0 significa que no hay límites duros,
   * pero el drag elastic proporciona resistencia.
   */
  CONSTRAINTS: { left: 0, right: 0 } as const,

  /**
   * Elasticidad del arrastre (0.5).
   * Valor entre 0-1. 0.5 = resistencia moderada al arrastrar.
   * Simula un efecto de goma elástica.
   */
  ELASTIC: 0.5,

  /**
   * Rigidez del rebote cuando se suelta (600).
   * Valor alto = rebote más enérgico al soltar la tarjeta.
   */
  BOUNCE_STIFFNESS: 600,

  /**
   * Amortiguación del rebote (20).
   * Controla cuánto rebota después de soltar.
   */
  BOUNCE_DAMPING: 20,

  /**
   * Potencia del momento de arrastre (0.2).
   * Valor entre 0-1. Controla cuánto inercia mantiene después de soltar.
   * 0.2 = poca inercia, más control inmediato.
   */
  POWER: 0.2,
} as const;

// ==================== CONSTANTES VISUALES ====================

/**
 * Valores constantes para el aspecto visual de la tarjeta.
 * Tamaños, opacidades y otras propiedades de presentación.
 */
export const CARD_VISUAL = {
  /**
   * Escala inicial de la tarjeta (0.8 = 80% del tamaño).
   * La tarjeta empieza más pequeña y crece al entrar.
   */
  INITIAL_SCALE: 0.8,

  /**
   * Opacidad inicial de la tarjeta (0 = invisible).
   * La tarjeta aparece gradualmente desde transparente.
   */
  INITIAL_OPACITY: 0,

  /**
   * Tamaño de íconos pequeños en píxeles (20px).
   * Usado para íconos en headers y badges.
   */
  ICON_SIZE_SMALL: 20,

  /**
   * Tamaño de íconos medianos en píxeles (90px).
   * Usado para el ícono principal del personaje.
   */
  ICON_SIZE_MEDIUM: 90,

  /**
   * Tamaño de íconos de flechas en píxeles (14px).
   * Usado para las flechas de dirección en el footer.
   */
  ICON_SIZE_ARROW: 14,

  /**
   * Opacidad durante el arrastre (0.5 = semi-transparente).
   * Los indicadores se atenúan mientras se arrastra la tarjeta.
   */
  DRAGGING_OPACITY: 0.5,

  /**
   * Opacidad normal (1 = completamente opaco).
   * Estado de opacidad por defecto cuando no hay interacción.
   */
  NORMAL_OPACITY: 1,
} as const;
