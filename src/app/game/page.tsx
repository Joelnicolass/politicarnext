import { notFound } from "next/navigation";
import { getDeckById } from "@/services/actions";
import GameScreen from "@/screens/game_screen";
import type { Metadata } from "next";
import { getTitle } from "@/utils/dev.utils";

interface GamePageProps {
  searchParams: Promise<{ deck?: string }>;
}

export async function generateMetadata({
  searchParams,
}: GamePageProps): Promise<Metadata> {
  const params = await searchParams;
  const deckId = params.deck || "default";
  const deck = await getDeckById(deckId);

  if (!deck) {
    return {
      title: "Juego no encontrado",
    };
  }

  return {
    title: `Jugando: ${deck.name}`,
    description: `${deck.description} - Gestiona tus recursos políticos y toma decisiones estratégicas.`,
    openGraph: {
      title: `Jugando: ${deck.name} | ${getTitle()}`,
      description: deck.description,
      url: `/game?deck=${deckId}`,
    },
    twitter: {
      title: `Jugando: ${deck.name} | ${getTitle()}`,
      description: deck.description,
    },
    robots: {
      index: false, // No indexar páginas de juego activas
      follow: true,
    },
  };
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const params = await searchParams;
  const deckId = params.deck || "default";
  const deck = await getDeckById(deckId);

  if (!deck || !deck.unlocked) {
    notFound();
  }

  return (
    <GameScreen
      cards={deck.cards}
      characters={deck.characters}
      objectivesPool={deck.objectivesPool}
      difficulty={deck.difficulty}
    />
  );
}
