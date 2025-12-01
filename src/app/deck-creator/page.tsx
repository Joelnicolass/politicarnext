"use client";

import DeckCreatorScreen from "@/screens/deck_creator_screen";
import type { Metadata } from "next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const metadata: Metadata = {
  title: "Creador de Mazos",
  description:
    "Crea tu propio mazo personalizado de Politicar. Diseña cartas, personajes y objetivos para tu propia experiencia política.",
  openGraph: {
    title: "Creador de Mazos | Politicar",
    description:
      "Crea tu propio mazo personalizado con cartas, personajes y objetivos únicos.",
    url: "/deck-creator",
  },
  twitter: {
    title: "Creador de Mazos | Politicar",
    description:
      "Crea tu propio mazo personalizado con cartas, personajes y objetivos únicos.",
  },
};

export default function DeckCreatorPage() {
  return <DeckCreatorScreen />;
}
