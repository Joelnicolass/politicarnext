import { useState, useCallback, useEffect, useMemo } from "react";
import { Objective } from "@/types";

export const useObjectives = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);

  const initObjectives = useCallback(
    (objectivesPool: Omit<Objective, "completed">[]) => {
      const shuffled = [...objectivesPool].sort(() => 0.5 - Math.random());
      const selected = shuffled
        .slice(0, 3)
        .map((o) => ({ ...o, completed: false }));
      setObjectives(selected);
    },
    []
  );

  const checkObjectives = useCallback((tags: string[] = []) => {
    if (tags.length === 0) return;
    setObjectives((prev) =>
      prev.map((obj) => {
        if (!obj.completed && tags.includes(obj.requiredTag)) {
          return { ...obj, completed: true };
        }
        return obj;
      })
    );
  }, []);

  const allCompleted = useMemo(
    () => objectives.every((o) => o.completed),
    [objectives]
  );

  return {
    objectives,
    allCompleted,
    initObjectives,
    checkObjectives,
  };
};
