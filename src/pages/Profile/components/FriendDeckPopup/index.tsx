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
  isVisible: boolean;
  setVisibility: (isVisible: boolean) => void;
}

const FriendDeckPopup: React.FC<FriendDeckPopupProps> = ({ user, isVisible, setVisibility }) => {
  const [featuredDeck, setFeaturedDeck] = useState<IDeck | null>(null);
  const [deckCards, setDeckCards] = useState<ICard[] | null>(null);

  useEffect(() => {
    if (user) {
      const setDeckAndCards = async () => {
        try {
          const featuredD = await user.profile.getDeck();
          setFeaturedDeck(featuredD);
          if (featuredD) {
            const cards = await featuredD.getCards();
            setDeckCards(cards);
          }
        } catch (error) {
          console.error("Error during profile fetch:" + error);
        }
      };
      setDeckAndCards();
      console.log(user.id);
    }
  }, [user]);
  
  if (!isVisible || !user) return null;

  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <div className="popupOverlay" onClick={handleClose}>
      <div className="popupContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={handleClose}>
          ×
        </button>
        <h3>{user.username}'s Deck</h3>
        {featuredDeck && deckCards && deckCards.length > 0 ? (
          <div className="cardsContainer">
            {deckCards.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
        ) : (
          <p>No cards in this deck.</p>
        )}
      </div>
    </div>
  );
};

export default FriendDeckPopup;
