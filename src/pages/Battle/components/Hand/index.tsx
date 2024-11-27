/**
 * @Created 2024-11-25
 * @Brief The user's hand.
 */

import React from "react";
import "./hand.css";
import HandCard from "../HandCard";
import { ICard } from "combatcritters-ts";

interface HandProps {
  hand: ICard[];
}

const Hand: React.FC<HandProps> = ({ hand }) => {
  return (
    <div className="handRoot">
      <div className="handTitle">
        <div className="weirdLineThingy" />
        <span>Hand</span>

        <img alt="Cards trio" className="cardsTrioImage" src="assets/images/cardsTrio.svg" />
        <div className="weirdLineThingy" />
      </div>
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
