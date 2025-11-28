// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export type StatType = 0 | 1 | 2 | 3;

export interface StatusEffect {
  name: string;
  stat: StatType;
  val: number;
  duration: number;
  type: "good" | "bad";
}

export interface Choice {
  text: string;
  effect: [number, number, number, number];
  statusEffect?: StatusEffect;
  tags?: string[];
}

export interface CardData {
  id: number;
  speaker: string;
  text: string;
  left: Choice;
  right: Choice;
}

export interface Objective {
  id: string;
  description: string;
  requiredTag: string;
  completed: boolean;
}

export interface Character {
  id: string;
  name: string;
  icon: string;
}
