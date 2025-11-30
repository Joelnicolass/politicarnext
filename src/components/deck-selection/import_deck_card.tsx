"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileJson, AlertCircle } from "lucide-react";
import { Deck } from "@/types";

interface ImportDeckCardProps {
  onImport: (deck: Deck) => void;
  index: number;
}

export function ImportDeckCard({ onImport, index }: ImportDeckCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateDeck = (data: unknown): data is Deck => {
    if (!data || typeof data !== "object") return false;

    const obj = data as Record<string, unknown>;
    const requiredFields = [
      "id",
      "name",
      "description",
      "difficulty",
      "cards",
      "characters",
      "objectivesPool",
    ];
    const hasRequiredFields = requiredFields.every((field) => field in obj);

    if (!hasRequiredFields) return false;
    if (!Array.isArray(obj.cards) || obj.cards.length === 0) return false;
    if (typeof obj.characters !== "object") return false;
    if (!Array.isArray(obj.objectivesPool)) return false;

    return true;
  };

  const handleFileRead = (content: string) => {
    try {
      const parsed = JSON.parse(content);

      if (!validateDeck(parsed)) {
        setError("El archivo JSON no tiene la estructura correcta de un Deck");
        return;
      }

      // Agregar campos por defecto si no existen
      const deck: Deck = {
        ...parsed,
        unlocked: true,
        hidden: false,
        thumbnail: parsed.thumbnail || "",
      };

      setError(null);
      onImport(deck);
    } catch (err) {
      setError(
        "Error al leer el archivo JSON. Verifica que sea un JSON válido."
      );
      console.error(err);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type !== "application/json") {
      setError("Por favor selecciona un archivo JSON válido");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      handleFileRead(content);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
    >
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative cursor-pointer
          bg-linear-to-br from-stone-800 to-stone-900
          border-2 ${isDragging ? "border-blue-500" : "border-stone-700"}
          rounded-lg overflow-hidden
          transition-all duration-300
          hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/30
          min-h-[280px] flex flex-col items-center justify-center p-6
        `}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-4 text-center">
          <div
            className={`
            p-4 rounded-full transition-all duration-300
            ${
              isDragging
                ? "bg-blue-600 scale-110"
                : "bg-stone-700 group-hover:bg-blue-700"
            }
          `}
          >
            {isDragging ? (
              <FileJson className="w-8 h-8 text-white" />
            ) : (
              <Upload className="w-8 h-8 text-stone-300 group-hover:text-white" />
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-2">Importar Deck</h3>
            <p className="text-sm text-stone-400 max-w-[200px]">
              {isDragging
                ? "Suelta el archivo aquí"
                : "Haz clic o arrastra un archivo JSON"}
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 bg-red-900/30 border border-red-700 rounded text-xs text-red-300 max-w-[250px]">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </motion.div>
  );
}
