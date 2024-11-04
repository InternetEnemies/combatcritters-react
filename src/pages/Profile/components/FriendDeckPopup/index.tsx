/**
 * @Created 2024-10-07
 * @Brief Popup for viewing a friends featured deck.
 */

import React from "react";
import { IUser } from "combatcritters-ts";
import "./friendDeckPopup.css";
import { IDeck } from "combatcritters-ts";
import { ICard } from "combatcritters-ts";
import Card from "components/Card";

interface FriendDeckPopupProps {
  friend: IUser | null;
  deck: IDeck | null;
  deckCards: ICard[] | null;
}

const FriendDeckPopup: React.FC<FriendDeckPopupProps> = ({
  friend,
  deck,
  deckCards,
}) => {
  if (!friend || !deck || !deckCards) {
    return null;
  }

  return (
    <div className="friendDeckPopupRoot">
      <h3>{friend.username}'s Deck</h3>

      <div className="cardsContainer">
        {deckCards?.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

export default FriendDeckPopup;
