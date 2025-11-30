import { Character } from "@/types";
import { Save } from "lucide-react";

interface CharacterEditorProps {
  character: Character;
  onChange: (character: Character) => void;
  onSave: () => void;
  onCancel: () => void;
  isNew: boolean;
  availableImages: string[];
}

export function CharacterEditor({
  character,
  onChange,
  onSave,
  onCancel,
  isNew,
  availableImages,
}: CharacterEditorProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-stone-800 rounded-lg border-4 border-red-900 max-w-md w-full p-6 space-y-4">
        <h3 className="text-xl font-propaganda text-red-500">
          {isNew ? "Nuevo Personaje" : "Editar Personaje"}
        </h3>

        <div>
          <label className="block text-sm text-stone-400 mb-2">ID</label>
          <input
            type="text"
            value={character.id}
            onChange={(e) => onChange({ ...character, id: e.target.value })}
            className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-400 mb-2">Nombre</label>
          <input
            type="text"
            value={character.name}
            onChange={(e) => onChange({ ...character, name: e.target.value })}
            className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-400 mb-2">
            Icono (emoji)
          </label>
          <input
            type="text"
            value={character.icon}
            onChange={(e) => onChange({ ...character, icon: e.target.value })}
            className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-stone-400 mb-2">Imagen</label>
          <select
            value={character.img || ""}
            onChange={(e) => onChange({ ...character, img: e.target.value })}
            className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
          >
            <option value="">Sin imagen</option>
            {availableImages.map((img) => (
              <option key={img} value={img}>
                {img}
              </option>
            ))}
          </select>
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
