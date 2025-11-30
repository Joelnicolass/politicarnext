import { notFound } from "next/navigation";
import { getDeckById } from "@/services/actions";
import GameScreen from "@/screens/game_screen";

interface GamePageProps {
  searchParams: Promise<{ deck?: string }>;
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
    />
  );
}
