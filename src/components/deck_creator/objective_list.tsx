import { Objective } from "@/types";
import { Trash2 } from "lucide-react";

interface ObjectiveListProps {
  objectives: Omit<Objective, "completed">[];
  onEdit: (objective: Omit<Objective, "completed">) => void;
  onDelete: (id: string) => void;
}

export function ObjectiveList({
  objectives,
  onEdit,
  onDelete,
}: ObjectiveListProps) {
  return (
    <div className="space-y-3">
      {objectives.map((obj) => (
        <div
          key={obj.id}
          className="bg-stone-800 p-4 rounded border-2 border-stone-700 flex items-center justify-between"
        >
          <div className="flex-1">
            <div className="font-bold text-white">{obj.description}</div>
            <div className="text-sm text-stone-400">Tag: {obj.requiredTag}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(obj)}
              className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded transition-all"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(obj.id)}
              className="bg-red-700 hover:bg-red-600 text-white px-3 py-2 rounded transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
