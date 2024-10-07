import React from "react";
import {
  ICard,
  ICardCritter,
  ICardItem,
} from "combatcritters-ts/src/objects";
import { ICardVisitor } from "combatcritters-ts";
import "./hpDmgFooter.css"
import { CardRarity } from "combatcritters-ts/src/objects";

const HpDmgFooter: React.FC<{ card: ICard }> = ({ card }) => {
  let content: React.ReactNode = null;
  let isVisible = true;

  const visitor: ICardVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      content = (
        <div className={`footerRoot ${CardRarity[card.rarity]}`}>
          <div className="hp">
            <img
              className="hpImage"
              src="/assets/images/heart.svg"
              alt="Heart"
            />
            <span className="hpText"> {critter.health} </span>
          </div>
          <div className="damage">
            <img
              className="swordImage"
              src="/assets/images/sword.svg"
              alt="Sword"
            />
            <span className="damageText"> {critter.damage} </span>
          </div>
        </div>
      );
    },
    visitItem: (item: ICardItem): void => {
      isVisible = false; 
    },
  };

  card.accept(visitor);

  return <div className={isVisible ? "" : "hidden"}>{content}</div>;
};

export default HpDmgFooter;
