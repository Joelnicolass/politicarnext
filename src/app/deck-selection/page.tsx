import { getDecks } from "@/services/actions";
import { DeckGrid } from "@/components/deck-selection/deck_grid";

export default async function DeckSelectionPage() {
  const decks = await getDecks();

  return <DeckGrid decks={decks} />;
}
