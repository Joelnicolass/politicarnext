import { CardData } from "@/types";
import { FileJson, Trash2 } from "lucide-react";

interface CardListProps {
  cards: CardData[];
  onEdit: (card: CardData) => void;
  onDelete: (id: number) => void;
}

export function CardList({ cards, onEdit, onDelete }: CardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-stone-800 p-4 rounded border-2 border-stone-700 hover:border-stone-600 transition-all"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <div className="text-sm text-stone-400">#{card.id}</div>
              <div className="font-bold text-white">
                {card.speaker || "Sin speaker"}
              </div>
              <div className="text-sm text-stone-300 line-clamp-2">
                {card.text || "Sin texto"}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(card)}
                className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded transition-all"
              >
                <FileJson size={16} />
              </button>
              <button
                onClick={() => onDelete(card.id)}
                className="bg-red-700 hover:bg-red-600 text-white p-2 rounded transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
