import { Character } from "@/types";
import { Trash2 } from "lucide-react";

interface CharacterListProps {
  characters: Record<string, Character>;
  onEdit: (character: Character) => void;
  onDelete: (id: string) => void;
}

export function CharacterList({
  characters,
  onEdit,
  onDelete,
}: CharacterListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.values(characters).map((char) => (
        <div
          key={char.id}
          className="bg-stone-800 p-4 rounded border-2 border-stone-700"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">{char.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-white">{char.name}</div>
              <div className="text-xs text-stone-400">{char.id}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(char)}
              className="flex-1 bg-blue-700 hover:bg-blue-600 text-white py-2 rounded transition-all text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(char.id)}
              className="bg-red-700 hover:bg-red-600 text-white px-3 rounded transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
