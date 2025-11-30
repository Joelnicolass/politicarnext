import { CardData, Character, Objective } from "@/types";
import { Save } from "lucide-react";
import { ChoiceEditor } from "./choice_editor";

interface CardEditorProps {
  card: CardData;
  onChange: (card: CardData) => void;
  onSave: () => void;
  onCancel: () => void;
  characters: Record<string, Character>;
  objectives: Omit<Objective, "completed">[];
  isNew: boolean;
}

export function CardEditor({
  card,
  onChange,
  onSave,
  onCancel,
  characters,
  objectives,
  isNew,
}: CardEditorProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800 rounded-lg border-4 border-red-900 max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-propaganda text-red-500">
            {isNew ? "Nueva Carta" : "Editar Carta"}
          </h3>

          <div>
            <label className="block text-sm text-stone-400 mb-2">Speaker</label>
            <select
              value={card.speaker}
              onChange={(e) => onChange({ ...card, speaker: e.target.value })}
              className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
            >
              <option value="">Seleccionar speaker...</option>
              {Object.keys(characters).map((charId) => (
                <option key={charId} value={charId}>
                  {characters[charId].name} ({charId})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-stone-400 mb-2">Texto</label>
            <textarea
              value={card.text}
              onChange={(e) => onChange({ ...card, text: e.target.value })}
              rows={3}
              className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChoiceEditor
              choice={card.left}
              onChange={(left) => onChange({ ...card, left })}
              objectives={objectives}
              title="← Opción Izquierda"
              color="text-red-400"
            />

            <ChoiceEditor
              choice={card.right}
              onChange={(right) => onChange({ ...card, right })}
              objectives={objectives}
              title="Opción Derecha →"
              color="text-green-400"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={onCancel}
              className="bg-stone-700 hover:bg-stone-600 text-white px-4 py-2 rounded transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={onSave}
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded transition-all flex items-center gap-2"
            >
              <Save size={18} />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
