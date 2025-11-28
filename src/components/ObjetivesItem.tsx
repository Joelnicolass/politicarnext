"use client";

import { CheckCircle2, Target } from "lucide-react";
import { Objective } from "@/types";

export const ObjectiveItem = ({ obj }: { obj: Objective }) => (
  <div
    className={`flex items-center gap-2 text-xs font-mono p-1 border-b border-stone-800 ${
      obj.completed
        ? "text-green-500 line-through opacity-50"
        : "text-stone-400"
    }`}
  >
    {obj.completed ? <CheckCircle2 size={12} /> : <Target size={12} />}
    <span>{obj.description}</span>
  </div>
);
