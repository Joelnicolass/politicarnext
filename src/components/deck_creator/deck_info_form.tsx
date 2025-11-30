import { motion } from "framer-motion";

interface DeckInfoFormProps {
  deckId: string;
  setDeckId: (value: string) => void;
  deckName: string;
  setDeckName: (value: string) => void;
  deckDescription: string;
  setDeckDescription: (value: string) => void;
  deckDifficulty: "easy" | "medium" | "hard";
  setDeckDifficulty: (value: "easy" | "medium" | "hard") => void;
  deckThumbnail: string;
  setDeckThumbnail: (value: string) => void;
}

export function DeckInfoForm({
  deckId,
  setDeckId,
  deckName,
  setDeckName,
  deckDescription,
  setDeckDescription,
  deckDifficulty,
  setDeckDifficulty,
  deckThumbnail,
  setDeckThumbnail,
}: DeckInfoFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="bg-stone-800 p-6 rounded border-2 border-stone-700">
        <h2 className="text-xl font-propaganda text-red-500 mb-4">
          Información del Deck
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-stone-400 mb-2">
              ID del Deck
            </label>
            <input
              type="text"
              value={deckId}
              onChange={(e) => setDeckId(e.target.value)}
              placeholder="deck_custom"
              className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-400 mb-2">Nombre</label>
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              placeholder="Mi Deck Personalizado"
              className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-400 mb-2">
              Descripción
            </label>
            <textarea
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
              placeholder="Descripción del deck..."
              rows={3}
              className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-stone-400 mb-2">
              Dificultad
            </label>
            <select
              value={deckDifficulty}
              onChange={(e) =>
                setDeckDifficulty(e.target.value as "easy" | "medium" | "hard")
              }
              className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
            >
              <option value="easy">Fácil</option>
              <option value="medium">Media</option>
              <option value="hard">Difícil</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-stone-400 mb-2">Ícono</label>
            <input
              type="text"
              value={deckThumbnail}
              onChange={(e) => setDeckThumbnail(e.target.value)}
              placeholder="✌🏻"
              className="w-full bg-stone-900 border-2 border-stone-700 rounded px-4 py-2 text-white focus:border-red-600 outline-none"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
