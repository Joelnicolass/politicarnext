"use client";

import { ReactNode } from "react";

import { motion, MotionValue } from "framer-motion";

import {
  useTinderCard,
  SwipeSide,
  SwipeSideOrNull,
  DragAxis,
  DRAG_CONFIG,
  CARD_VISUAL,
} from ".";

interface TinderCardRenderProps {
  /** Valor de opacidad para el indicador derecho */
  opacityRight: MotionValue<number>;
  /** Valor de opacidad para el indicador izquierdo */
  opacityLeft: MotionValue<number>;
  /** Estado que indica si la tarjeta está siendo arrastrada */
  isDragging: boolean;
}

interface TinderCardProps {
  /** Contenido que se mostrará dentro de la tarjeta */
  children: ReactNode | ((props: TinderCardRenderProps) => ReactNode);
  /** Callback que se ejecuta cuando se completa el swipe */
  onResolve: (side: SwipeSide) => void;
  /** Callback que se ejecuta durante el arrastre para mostrar preview */
  onPreview: (side: SwipeSideOrNull) => void;
  /** Clases CSS personalizadas para el contenedor */
  className?: string;
  /** Umbral de distancia personalizado para confirmar el drag (default: 100px) */
  threshold?: number;
  /** Umbral de velocidad personalizado para confirmar el swipe (default: 500px/s) */
  velocityThreshold?: number;
  /** Umbral para mostrar el preview (default: 50px) */
  previewThreshold?: number;
}

/**
 * Componente genérico de tarjeta con interacción tipo Tinder.
 *
 * Permite arrastrar contenido horizontalmente y ejecutar acciones
 * basadas en la dirección del swipe (izquierda o derecha).
 *
 * Soporta dos formas de uso:
 * 1. Con children normal
 * 2. Con render props para acceder a opacities y isDragging
 *
 * @example
 * // Uso simple
 * ```tsx
 * <TinderCard
 *   onResolve={(side) => console.log('Swiped:', side)}
 *   onPreview={(side) => console.log('Previewing:', side)}
 *   className="w-96 h-[500px]"
 * >
 *   <div>Mi contenido personalizado</div>
 * </TinderCard>
 * ```
 *
 * @example
 * // Uso con render props
 * ```tsx
 * <TinderCard
 *   onResolve={(side) => console.log('Swiped:', side)}
 *   onPreview={(side) => console.log('Previewing:', side)}
 * >
 *   {({ opacityRight, opacityLeft, isDragging }) => (
 *     <div>
 *       <motion.div style={{ opacity: opacityRight }}>RIGHT</motion.div>
 *       <motion.div style={{ opacity: opacityLeft }}>LEFT</motion.div>
 *     </div>
 *   )}
 * </TinderCard>
 * ```
 */
export const TinderCard = ({
  children,
  onResolve,
  onPreview,
  className = "relative w-full max-w-md h-[450px] perspective-1000 cursor-grab active:cursor-grabbing",
  threshold,
  velocityThreshold,
  previewThreshold,
}: TinderCardProps) => {
  const {
    x,
    rotate,
    opacityRight,
    opacityLeft,
    isDragging,
    controls,
    shouldReduceMotion,
    handleDragStart,
    handleDragEnd,
  } = useTinderCard({
    onResolve,
    onPreview,
    threshold,
    velocityThreshold,
    previewThreshold,
  });

  const renderProps: TinderCardRenderProps = {
    opacityRight,
    opacityLeft,
    isDragging,
  };

  return (
    <motion.div
      drag={DragAxis.X}
      dragConstraints={DRAG_CONFIG.CONSTRAINTS}
      dragElastic={DRAG_CONFIG.ELASTIC}
      dragTransition={{
        bounceStiffness: DRAG_CONFIG.BOUNCE_STIFFNESS,
        bounceDamping: DRAG_CONFIG.BOUNCE_DAMPING,
        power: DRAG_CONFIG.POWER,
      }}
      dragMomentum={!shouldReduceMotion}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={controls}
      style={{ x, rotate }}
      initial={{
        scale: CARD_VISUAL.INITIAL_SCALE,
        opacity: CARD_VISUAL.INITIAL_OPACITY,
      }}
      className={className}
    >
      {typeof children === "function" ? children(renderProps) : children}
    </motion.div>
  );
};
