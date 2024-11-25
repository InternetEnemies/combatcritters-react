/**
 * @Created 2024-11-25
 * @Brief The user's hand.
 */

import React, { useEffect } from "react";
import "./hand.css";
import HandCard from "../HandCard";
import { ICard } from "combatcritters-ts";

interface HandProps {
  hand: ICard[];
  activeCardId: string | null; 
}

const Hand: React.FC<HandProps> = ({ hand, activeCardId }) => {
  return (
    <div className="handRoot">
      <div className="handTitle">
        <span>Hand</span>
        <img className="cardsTrioImage" src="assets/images/cardsTrio.svg" />
      </div>
      <hr className="separator" />
      <div className="handCards">
        {hand.map((card, index) => (
          <HandCard
            key={index}
            card={card}
            scale={0.85}
            dragId={index.toString()}
          />
        ))}
      </div>
    </div>
  );
};

export default Hand;