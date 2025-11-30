"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Users, Target, FileJson, Download, Upload } from "lucide-react";
import { AppVersion, PageHeader } from "@/components";
import { CardData, Character, Objective, Deck } from "@/types";
import { APP_NAME } from "@/utils/constants";
import {
  DeckInfoForm,
  CardEditor,
  CardList,
  CharacterEditor,
  CharacterList,
  ObjectiveEditor,
  ObjectiveList,
} from "@/components/deck_creator";

type TabType = "info" | "cards" | "characters" | "objectives";

// Lista de imágenes disponibles
const AVAILABLE_IMAGES = [
  "alberto.png",
  "bullrich.png",
  "campo_a.png",
  "campo_b.png",
  "cfk.png",
  "cgt.png",
  "fmi.png",
  "gremio_a.png",
  "joven_a.png",
  "karina.png",
  "macri.png",
  "massa.png",
  "milei.png",
  "ministro_a.png",
  "ministro_b.png",
  "ministro_c.png",
  "mujer_a.png",
  "mujer_b.png",
  "periodistas.png",
  "perro_politico.png",
  "politico_a.png",
  "secretaria_a.png",
  "secretaria_b.png",
  "vieja_a.png",
  "viejo_a.png",
];

export default function DeckCreatorScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("info");

  // Deck Info
  const [deckId, setDeckId] = useState("");
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [deckDifficulty, setDeckDifficulty] = useState<
    "easy" | "medium" | "hard"
  >("medium");
  const [deckThumbnail, setDeckThumbnail] = useState("😎");

  // Cards
  const [cards, setCards] = useState<CardData[]>([]);
  const [editingCard, setEditingCard] = useState<CardData | null>(null);

  // Characters
  const [characters, setCharacters] = useState<Record<string, Character>>({});
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(
    null
  );

  // Objectives
  const [objectives, setObjectives] = useState<Omit<Objective, "completed">[]>(
    []
  );
  const [editingObjective, setEditingObjective] = useState<Omit<
    Objective,
    "completed"
  > | null>(null);

  const handleBack = () => {
    router.push("/");
  };

  const handleExportDeck = () => {
    const deck: Deck = {
      id: deckId || `deck_${Date.now()}`,
      name: deckName || "Deck sin nombre",
      description: deckDescription || "Sin descripción",
      difficulty: deckDifficulty,
      thumbnail: deckThumbnail,
      cards: cards,
      characters: characters,
      objectivesPool: objectives,
      unlocked: true,
    };

    const dataStr = JSON.stringify(deck, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${deck.id}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImportDeck = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const deck = JSON.parse(e.target?.result as string) as Deck;
        setDeckId(deck.id);
        setDeckName(deck.name);
        setDeckDescription(deck.description);
        setDeckDifficulty(deck.difficulty);
        setDeckThumbnail(deck.thumbnail);
        setCards(deck.cards);
        setCharacters(deck.characters);
        setObjectives(deck.objectivesPool);
      } catch (error) {
        alert("Error al importar el deck: " + error);
      }
    };
    reader.readAsText(file);
  };

  const addNewCard = () => {
    const newCard: CardData = {
      id: cards.length > 0 ? Math.max(...cards.map((c) => c.id)) + 1 : 1,
      speaker: "",
      text: "",
      left: {
        text: "",
        effect: [0, 0, 0, 0],
        tags: [],
      },
      right: {
        text: "",
        effect: [0, 0, 0, 0],
        tags: [],
      },
    };
    setEditingCard(newCard);
  };

  const saveCard = () => {
    if (!editingCard) return;

    const existingIndex = cards.findIndex((c) => c.id === editingCard.id);
    if (existingIndex >= 0) {
      const newCards = [...cards];
      newCards[existingIndex] = editingCard;
      setCards(newCards);
    } else {
      setCards([...cards, editingCard]);
    }
    setEditingCard(null);
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter((c) => c.id !== id));
  };

  const addNewCharacter = () => {
    const newCharacter: Character = {
      id: `char_${Date.now()}`,
      name: "",
      icon: "👤",
    };
    setEditingCharacter(newCharacter);
  };

  const saveCharacter = () => {
    if (!editingCharacter) return;

    setCharacters({
      ...characters,
      [editingCharacter.id]: editingCharacter,
    });
    setEditingCharacter(null);
  };

  const deleteCharacter = (id: string) => {
    const newCharacters = { ...characters };
    delete newCharacters[id];
    setCharacters(newCharacters);
  };

  const addNewObjective = () => {
    const newObjective: Omit<Objective, "completed"> = {
      id: `obj_${Date.now()}`,
      description: "",
      requiredTag: "",
    };
    setEditingObjective(newObjective);
  };

  const saveObjective = () => {
    if (!editingObjective) return;

    const existingIndex = objectives.findIndex(
      (o) => o.id === editingObjective.id
    );
    if (existingIndex >= 0) {
      const newObjectives = [...objectives];
      newObjectives[existingIndex] = editingObjective;
      setObjectives(newObjectives);
    } else {
      setObjectives([...objectives, editingObjective]);
    }
    setEditingObjective(null);
  };

  const deleteObjective = (id: string) => {
    setObjectives(objectives.filter((o) => o.id !== id));
  };

  const tabs = [
    { id: "info" as TabType, label: "Info", icon: FileJson },
    {
      id: "cards" as TabType,
      label: "Cartas",
      icon: FileJson,
      count: cards.length,
    },
    {
      id: "characters" as TabType,
      label: "Personajes",
      icon: Users,
      count: Object.keys(characters).length,
    },
    {
      id: "objectives" as TabType,
      label: "Objetivos",
      icon: Target,
      count: objectives.length,
    },
  ];

  return (
    <div className="crt min-h-dvh w-full flex flex-col items-center p-2 sm:p-4 relative font-tech select-none bg-[#1a1815] text-[#dcdcdc] overflow-x-hidden">
      <PageHeader
        title={`CREADOR DE DECKS - ${APP_NAME}`}
        subtitle="Creá y editá tus propios escenarios políticos"
        onBack={handleBack}
        actions={
          <>
            <label className="cursor-pointer bg-blue-800 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded border border-stone-600 transition-all active:scale-95 flex items-center gap-2">
              <Upload size={18} />
              <span className="hidden sm:inline">Importar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportDeck}
                className="hidden"
              />
            </label>
            <button
              onClick={handleExportDeck}
              className="bg-green-800 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded border border-stone-600 transition-all active:scale-95 flex items-center gap-2"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Exportar</span>
            </button>
          </>
        }
      />

      {/* Tabs */}
      <div className="w-full max-w-4xl bg-stone-900 border-b-2 border-stone-700 mb-4">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 sm:flex-none sm:px-6 py-3 font-propaganda text-sm sm:text-base transition-all border-b-4 flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? "bg-stone-800 border-red-600 text-red-500"
                  : "border-transparent text-stone-400 hover:text-stone-300 hover:bg-stone-800/50"
              }`}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count !== undefined && (
                <span className="bg-stone-700 text-xs px-2 py-0.5 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-4xl px-2 sm:px-0 pb-8">
        {/* Info Tab */}
        {activeTab === "info" && (
          <DeckInfoForm
            deckId={deckId}
            setDeckId={setDeckId}
            deckName={deckName}
            setDeckName={setDeckName}
            deckDescription={deckDescription}
            setDeckDescription={setDeckDescription}
            deckDifficulty={deckDifficulty}
            setDeckDifficulty={setDeckDifficulty}
            deckThumbnail={deckThumbnail}
            setDeckThumbnail={setDeckThumbnail}
          />
        )}

        {/* Cards Tab */}
        {activeTab === "cards" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-propaganda text-red-500">
                Cartas del Deck
              </h2>
              <button
                onClick={addNewCard}
                className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded border-2 border-stone-900 transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus size={18} />
                Nueva Carta
              </button>
            </div>

            <CardList
              cards={cards}
              onEdit={setEditingCard}
              onDelete={deleteCard}
            />

            {editingCard && (
              <CardEditor
                card={editingCard}
                onChange={setEditingCard}
                onSave={saveCard}
                onCancel={() => setEditingCard(null)}
                characters={characters}
                objectives={objectives}
                isNew={!cards.find((c) => c.id === editingCard.id)}
              />
            )}
          </motion.div>
        )}

        {/* Characters Tab */}
        {activeTab === "characters" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-propaganda text-red-500">
                Personajes
              </h2>
              <button
                onClick={addNewCharacter}
                className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded border-2 border-stone-900 transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus size={18} />
                Nuevo Personaje
              </button>
            </div>

            <CharacterList
              characters={characters}
              onEdit={setEditingCharacter}
              onDelete={deleteCharacter}
            />

            {editingCharacter && (
              <CharacterEditor
                character={editingCharacter}
                onChange={setEditingCharacter}
                onSave={saveCharacter}
                onCancel={() => setEditingCharacter(null)}
                isNew={!characters[editingCharacter.id]}
                availableImages={AVAILABLE_IMAGES}
              />
            )}
          </motion.div>
        )}

        {/* Objectives Tab */}
        {activeTab === "objectives" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-propaganda text-red-500">
                Objetivos
              </h2>
              <button
                onClick={addNewObjective}
                className="bg-green-800 hover:bg-green-700 text-white px-4 py-2 rounded border-2 border-stone-900 transition-all active:scale-95 flex items-center gap-2"
              >
                <Plus size={18} />
                Nuevo Objetivo
              </button>
            </div>

            <ObjectiveList
              objectives={objectives}
              onEdit={setEditingObjective}
              onDelete={deleteObjective}
            />

            {editingObjective && (
              <ObjectiveEditor
                objective={editingObjective}
                onChange={setEditingObjective}
                onSave={saveObjective}
                onCancel={() => setEditingObjective(null)}
                isNew={!objectives.find((o) => o.id === editingObjective.id)}
              />
            )}
          </motion.div>
        )}
      </div>

      <AppVersion />
    </div>
  );
}
