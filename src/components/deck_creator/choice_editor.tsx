import { Choice, Objective } from "@/types";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SpecialEffectEditor } from "./special_effect_editor";
import { NumericInput } from "./numeric_input";
import { StatusEffectEditor } from "./status_effect_editor";

interface ChoiceEditorProps {
  choice: Choice;
  onChange: (choice: Choice) => void;
  objectives: Omit<Objective, "completed">[];
  title: string;
  color: string;
}

export function ChoiceEditor({
  choice,
  onChange,
  objectives,
  title,
  color,
}: ChoiceEditorProps) {
  const handleEffectChange = (idx: number, value: number) => {
    const newEffect = [...choice.effect] as [number, number, number, number];
    newEffect[idx] = value;
    onChange({ ...choice, effect: newEffect });
  };

  return (
    <div className="bg-stone-900 p-4 rounded">
      <h4 className={`${color} font-bold mb-2`}>{title}</h4>
      <div className="space-y-2">
        <input
          type="text"
          value={choice.text}
          onChange={(e) => onChange({ ...choice, text: e.target.value })}
          placeholder="Texto de la opción"
          className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-sm text-white focus:border-red-600 outline-none"
        />

        <div>
          <label className="block text-xs text-stone-400 mb-1">
            Efectos en stats
          </label>
          <div className="grid grid-cols-4 gap-1">
            {choice.effect.map((val, idx) => (
              <NumericInput
                key={idx}
                value={val}
                onChange={(value) => handleEffectChange(idx, value)}
                className="w-full bg-stone-800 border border-stone-700 rounded px-2 py-1 text-xs text-white focus:border-red-600 outline-none"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-stone-400 mb-1">
            Tags de objetivos
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-sm text-white focus:border-red-600 outline-none flex items-center justify-between">
                <span className="truncate">
                  {choice.tags && choice.tags.length > 0
                    ? `${choice.tags.length} seleccionado(s)`
                    : "Seleccionar tags..."}
                </span>
                <ChevronDown size={16} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-stone-800 border-stone-700">
              <DropdownMenuLabel className="text-stone-400">
                Tags disponibles
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-stone-700" />
              {objectives.length === 0 ? (
                <div className="px-2 py-2 text-xs text-stone-500">
                  No hay objetivos creados
                </div>
              ) : (
                objectives.map((obj) => (
                  <DropdownMenuCheckboxItem
                    key={obj.id}
                    className="text-white"
                    checked={choice.tags?.includes(obj.requiredTag) || false}
                    onCheckedChange={(checked) => {
                      const currentTags = choice.tags || [];
                      const newTags = checked
                        ? [...currentTags, obj.requiredTag]
                        : currentTags.filter((t) => t !== obj.requiredTag);
                      onChange({ ...choice, tags: newTags });
                    }}
                  >
                    {obj.requiredTag}
                  </DropdownMenuCheckboxItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <StatusEffectEditor
          statusEffect={choice.statusEffect}
          onChange={(effect) => onChange({ ...choice, statusEffect: effect })}
        />

        <SpecialEffectEditor
          specialEffect={choice.specialEffect}
          onChange={(effect) => onChange({ ...choice, specialEffect: effect })}
        />
      </div>
    </div>
  );
}
