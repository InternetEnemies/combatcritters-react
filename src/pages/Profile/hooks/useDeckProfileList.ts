/**
 * @Created 2024-10-07
 * @Brief Hook that manages featuring the user's decks.
 */

import { useState, useEffect } from "react";
import { IDeck } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";
import { ICard } from "combatcritters-ts";

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

        const deck = await ClientSingleton.getInstance().user.profile.getDeck();
        if (deck) {
          setFeaturedDeck(deck);
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
          ClientSingleton.getInstance().user.profile.setDeck(featuredDeck);
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
