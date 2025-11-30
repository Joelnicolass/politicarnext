import { Objective } from "@/types";
import { Save } from "lucide-react";

interface ObjectiveEditorProps {
  objective: Omit<Objective, "completed">;
  onChange: (objective: Omit<Objective, "completed">) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
}

export function ObjectiveEditor({
  objective,
  onChange,
  onSave,
  onCancel,
  isNew,
}: ObjectiveEditorProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800 rounded-lg border-4 border-red-900 max-w-md w-full p-6 space-y-4">
        <h3 className="text-xl font-propaganda text-red-500">
          {isNew ? "Nuevo Objetivo" : "Editar Objetivo"}
        </h3>

        <div>
          <label className="block text-sm text-stone-400 mb-2">
            Descripción
          </label>
          <textarea
            value={objective.description}
            onChange={(e) =>
              onChange({ ...objective, description: e.target.value })
            }
            rows={2}
            className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-400 mb-2">
            Tag Requerido
          </label>
          <input
            type="text"
            value={objective.requiredTag}
            onChange={(e) =>
              onChange({ ...objective, requiredTag: e.target.value })
            }
            className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
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
  );
}
