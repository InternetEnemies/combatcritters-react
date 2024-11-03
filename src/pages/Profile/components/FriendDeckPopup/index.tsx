/**
 * @Created 2024-10-07
 * @Brief Popup for viewing a friends featured deck.
 */

import React, { useState } from "react";
import { IUser } from "combatcritters-ts";
import "./friendDeckPopup.css";
import { IDeck } from "combatcritters-ts";
import { useEffect } from "react";
import { ICard } from "combatcritters-ts";
import Card from "components/Card";

interface FriendDeckPopupProps {
  user: IUser | null;
}

const FriendDeckPopup: React.FC<FriendDeckPopupProps> = ({ user }) => {
  const [featuredDeck, setFeaturedDeck] = useState<IDeck | null>(null);
  const [deckCards, setDeckCards] = useState<ICard[] | null>(null);

  /**
   * On user change, fetch the user's featured deck and fetch the cards in the deck.
   */
  // useEffect(() => {
  //   if (user) {
  //     const setDeckAndCards = async () => {
  //       try {
  //         const featuredD = await user.profile.getDeck();
  //         setFeaturedDeck(featuredD);

  //         if (featuredD) {
  //           const cards = await featuredD.getCards();
  //           setDeckCards(cards);
  //         }
  //       } catch (error) {
  //         console.error("Error during profile fetch:" + error);
  //       }
  //     };
  //     setDeckAndCards();
  //   }
  // }, [user]);

  if (!user || !featuredDeck) {
    return null;
  }

  return (
    <div className="friendDeckPopupRoot">
      <h3>{user.username}'s Deck</h3>

      <div className="cardsContainer">
        {deckCards?.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FriendDeckPopup;
