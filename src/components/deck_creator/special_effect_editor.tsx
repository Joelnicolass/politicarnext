import { SpecialEffect } from "@/types";
import { X } from "lucide-react";

interface SpecialEffectEditorProps {
  specialEffect?: SpecialEffect;
  onChange: (effect: SpecialEffect | undefined) => void;
}

export function SpecialEffectEditor({
  specialEffect,
  onChange,
}: SpecialEffectEditorProps) {
  const handleAdd = () => {
    onChange({
      type: "add_cards",
      data: undefined,
    });
  };

  const handleRemove = () => {
    onChange(undefined);
  };

  const handleTypeChange = (type: SpecialEffect["type"]) => {
    onChange({
      type,
      data: undefined,
    });
  };

  if (!specialEffect) {
    return (
      <button
        onClick={handleAdd}
        className="w-full bg-stone-700 hover:bg-stone-600 border border-stone-600 rounded px-3 py-2 text-sm text-stone-300 transition-all"
      >
        + Agregar Special Effect
      </button>
    );
  }

  return (
    <div className="bg-stone-700 p-3 rounded border border-stone-600 space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-stone-300">Special Effect</span>
        <button
          onClick={handleRemove}
          className="text-red-400 hover:text-red-300 p-1"
        >
          <X size={14} />
        </button>
      </div>

      <div>
        <label className="block text-xs text-stone-400 mb-1">Tipo</label>
        <select
          value={specialEffect.type}
          onChange={(e) =>
            handleTypeChange(e.target.value as SpecialEffect["type"])
          }
          className="w-full bg-stone-800 border border-stone-600 rounded px-2 py-1 text-xs text-white outline-none"
        >
          <option value="add_deck">Agregar Deck</option>
          <option value="add_cards">Agregar Cartas</option>
          <option value="add_objectives">Agregar Objetivos</option>
        </select>
      </div>

      <div className="text-xs text-stone-400 p-2 bg-stone-800 rounded">
        ℹ️ Los datos del special effect deben configurarse manualmente en el
        JSON exportado
      </div>
    </div>
  );
}
