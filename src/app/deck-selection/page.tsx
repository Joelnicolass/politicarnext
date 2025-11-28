import { getDecks } from "@/services/actions";
import { DeckGrid } from "@/components/DeckGrid";

export default async function DeckSelectionPage() {
  const decks = await getDecks();

  return <DeckGrid decks={decks} />;
}
