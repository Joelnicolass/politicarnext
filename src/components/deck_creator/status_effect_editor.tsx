import { StatusEffect, StatType } from "@/types";
import { X } from "lucide-react";
import { NumericInput } from "./numeric_input";

interface StatusEffectEditorProps {
  statusEffect?: StatusEffect;
  onChange: (effect: StatusEffect | undefined) => void;
}

const STAT_NAMES = [
  "Opinión Pública",
  "Economía",
  "Defensa Nacional",
  "Gremialistas",
];

export function StatusEffectEditor({ statusEffect, onChange }: StatusEffectEditorProps) {
  const handleAdd = () => {
    onChange({
      name: "",
      stat: 0,
      val: 0,
      duration: 1,
      type: "good",
    });
  };

  const handleRemove = () => {
    onChange(undefined);
  };

  const handleChange = (field: keyof StatusEffect, value: string | number | StatType | "good" | "bad") => {
    if (!statusEffect) return;
    onChange({ ...statusEffect, [field]: value });
  };

  if (!statusEffect) {
    return (
      <button
        onClick={handleAdd}
        className="w-full bg-stone-700 hover:bg-stone-600 border border-stone-600 rounded px-3 py-2 text-sm text-stone-300 transition-all"
      >
        + Agregar Status Effect
      </button>
    );
  }

  return (
    <div className="bg-stone-700 p-3 rounded border border-stone-600 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-stone-300">Status Effect</span>
        <button
          onClick={handleRemove}
          className="text-red-400 hover:text-red-300 p-1"
        >
          <X size={14} />
        </button>
      </div>
      
      <input
        type="text"
        value={statusEffect.name}
        onChange={(e) => handleChange("name", e.target.value)}
        placeholder="Nombre del efecto"
        className="w-full bg-stone-800 border border-stone-600 rounded px-2 py-1 text-xs text-white outline-none"
      />
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-stone-400 mb-1">Stat</label>
          <select
            value={statusEffect.stat}
            onChange={(e) => handleChange("stat", parseInt(e.target.value) as StatType)}
            className="w-full bg-stone-800 border border-stone-600 rounded px-2 py-1 text-xs text-white outline-none"
          >
            {STAT_NAMES.map((name, idx) => (
              <option key={idx} value={idx}>{name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-xs text-stone-400 mb-1">Tipo</label>
          <select
            value={statusEffect.type}
            onChange={(e) => handleChange("type", e.target.value)}
            className="w-full bg-stone-800 border border-stone-600 rounded px-2 py-1 text-xs text-white outline-none"
          >
            <option value="good">Bueno</option>
            <option value="bad">Malo</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-stone-400 mb-1">Valor</label>
          <NumericInput
            value={statusEffect.val}
            onChange={(value) => handleChange("val", value)}
            className="w-full bg-stone-800 border border-stone-600 rounded px-2 py-1 text-xs text-white outline-none"
          />
        </div>
        
        <div>
          <label className="block text-xs text-stone-400 mb-1">Duración</label>
          <NumericInput
            value={statusEffect.duration}
            onChange={(value) => handleChange("duration", value)}
            min={1}
            className="w-full bg-stone-800 border border-stone-600 rounded px-2 py-1 text-xs text-white outline-none"
          />
        </div>
      </div>
    </div>
  );
}
