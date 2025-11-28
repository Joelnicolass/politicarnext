"use client";

import { CheckCircle2, Target } from "lucide-react";
import { Objective } from "@/types";

export const ObjectiveItem = ({ obj }: { obj: Objective }) => (
  <div
    className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono p-1 border-b border-stone-800 ${
      obj.completed
        ? "text-green-500 line-through opacity-50"
        : "text-stone-400"
    }`}
  >
    {obj.completed ? (
      <CheckCircle2 size={10} className="sm:w-3 sm:h-3 shrink-0" />
    ) : (
      <Target size={10} className="sm:w-3 sm:h-3 shrink-0" />
    )}
    <span className="leading-tight">{obj.description}</span>
  </div>
);
