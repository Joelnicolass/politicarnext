import { getDecks } from "@/services/actions";
import { DeckGrid } from "@/components/deck-selection/deck_grid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Selección de Mazos",
  description:
    "Elige tu mazo político favorito: Kirchnerismo, Menemismo, Qatar, Crisis 2000 y más. Cada mazo ofrece una experiencia única de la política argentina.",
  openGraph: {
    title: "Selección de Mazos | Politicar",
    description:
      "Elige tu mazo político favorito y vive diferentes momentos de la política argentina.",
    url: "/deck-selection",
  },
  twitter: {
    title: "Selección de Mazos | Politicar",
    description:
      "Elige tu mazo político favorito y vive diferentes momentos de la política argentina.",
  },
};

export default async function DeckSelectionPage() {
  const decks = await getDecks();

  return <DeckGrid decks={decks} />;
}
