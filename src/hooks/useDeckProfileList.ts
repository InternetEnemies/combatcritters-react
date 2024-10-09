import { useState, useEffect } from "react";
import { IDeck } from "combatcritters-ts/src/objects";
import { ClientSingleton } from "ClientSingleton";
import { ICard } from "combatcritters-ts/src/objects";

export const useDeckProfileList = () => {
  const [decks, setDecks] = useState<IDeck[]>([]);
  const [featuredDeck, setFeaturedDeck] = useState<IDeck>();
  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const userDecks =
          await ClientSingleton.getInstance().user.decks.getDecks();
        setDecks(userDecks);

        if (userDecks.length > 0) {
          setFeaturedDeck(userDecks[0]);
        }
      } catch (error) {
        console.error("Failed to fetch decks:", error);
      }
    };

    fetchDecks();
  }, []);

  useEffect(() => {
    const fetchCards = async () => {
      if (featuredDeck) {
        try {
          const deckCards = await featuredDeck.getCards(); 
          setCards(deckCards);
        } catch (error) {
          console.error("Failed to fetch cards:", error);
        }
      }
    };

    fetchCards();
  }, [featuredDeck]);

  return { decks, featuredDeck, setFeaturedDeck, cards };
};