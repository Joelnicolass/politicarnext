import { useEffect } from "react";

export const useEffectOnce = (effect: () => void | (() => void)) => {
  useEffect(() => {
    return effect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
