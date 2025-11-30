import { useRef, useState, useEffect } from "react";
import {
  useMotionValue,
  useAnimation,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  PanInfo,
} from "framer-motion";
import {
  SwipeSide,
  SwipeSideOrNull,
  SwipeDirection,
  TRANSFORM_RANGES,
  EXIT_ANIMATION,
  ENTRY_ANIMATION,
  RETURN_ANIMATION,
  DEFAULT_THRESHOLDS,
} from "./consants";

interface UseTinderCardOptions {
  onResolve: (side: SwipeSide) => void;
  onPreview: (side: SwipeSideOrNull) => void;
  threshold?: number;
  velocityThreshold?: number;
  previewThreshold?: number;
}

export const useTinderCard = ({
  onResolve,
  onPreview,
  threshold = DEFAULT_THRESHOLDS.DRAG,
  velocityThreshold = DEFAULT_THRESHOLDS.VELOCITY,
  previewThreshold = DEFAULT_THRESHOLDS.PREVIEW,
}: UseTinderCardOptions) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const lastSide = useRef<SwipeSideOrNull>(null);
  const [isDragging, setIsDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Transformaciones de animación
  const rotate = useTransform(
    x,
    TRANSFORM_RANGES.X_INPUT,
    TRANSFORM_RANGES.ROTATION_OUTPUT
  );
  const opacityRight = useTransform(
    x,
    TRANSFORM_RANGES.OPACITY_RIGHT_INPUT,
    TRANSFORM_RANGES.OPACITY_RIGHT_OUTPUT
  );
  const opacityLeft = useTransform(
    x,
    TRANSFORM_RANGES.OPACITY_LEFT_INPUT,
    TRANSFORM_RANGES.OPACITY_LEFT_OUTPUT
  );

  // Animación de entrada
  useEffect(() => {
    controls.start({
      scale: ENTRY_ANIMATION.SCALE,
      opacity: ENTRY_ANIMATION.OPACITY,
      x: ENTRY_ANIMATION.X,
      transition: {
        type: "spring",
        stiffness: ENTRY_ANIMATION.SPRING_STIFFNESS,
        damping: ENTRY_ANIMATION.SPRING_DAMPING,
      },
    });
  }, [controls]);

  // Listener para cambios en el valor x durante el arrastre
  useMotionValueEvent(x, "change", (latest) => {
    if (!isDragging) return;

    let currentSide: SwipeSideOrNull = null;
    if (latest > previewThreshold) currentSide = SwipeDirection.RIGHT;
    else if (latest < -previewThreshold) currentSide = SwipeDirection.LEFT;

    if (currentSide !== lastSide.current) {
      lastSide.current = currentSide;
      onPreview(currentSide);
    }
  });

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    onPreview(null);
    lastSide.current = null;

    if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      await controls.start({
        x: EXIT_ANIMATION.DISTANCE,
        opacity: EXIT_ANIMATION.OPACITY,
        transition: {
          duration: shouldReduceMotion
            ? EXIT_ANIMATION.REDUCED_MOTION_DURATION
            : EXIT_ANIMATION.DURATION,
        },
      });
      onResolve(SwipeDirection.RIGHT);
    } else if (
      info.offset.x < -threshold ||
      info.velocity.x < -velocityThreshold
    ) {
      await controls.start({
        x: -EXIT_ANIMATION.DISTANCE,
        opacity: EXIT_ANIMATION.OPACITY,
        transition: {
          duration: shouldReduceMotion
            ? EXIT_ANIMATION.REDUCED_MOTION_DURATION
            : EXIT_ANIMATION.DURATION,
        },
      });
      onResolve(SwipeDirection.LEFT);
    } else {
      controls.start({
        x: RETURN_ANIMATION.X,
        transition: shouldReduceMotion
          ? { duration: RETURN_ANIMATION.REDUCED_MOTION_DURATION }
          : {
              type: "spring",
              stiffness: RETURN_ANIMATION.SPRING_STIFFNESS,
              damping: RETURN_ANIMATION.SPRING_DAMPING,
            },
      });
    }
  };

  return {
    x,
    rotate,
    opacityRight,
    opacityLeft,
    isDragging,
    controls,
    shouldReduceMotion,
    handleDragStart,
    handleDragEnd,
  };
};
