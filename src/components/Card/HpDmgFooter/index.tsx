// import './hpDmgFooter.css'

// interface Props {
//     hp: number;
//     damage: number;
//     rarity: string;
//     type: string
//   }

//   const HpDmgFooter: React.FC<Props> = ({ hp, damage, rarity, type }) => {
//     const visibilityClass = type === "item" ? "invisible" : "";

//     return (
//       <div className={`footerRoot ${rarity} ${visibilityClass}`}>
//         <div className="hp">
//           <img className="hpImage" src="/assets/images/heart.svg" alt="Heart" />
//           <span className="hpText"> {hp} </span>
//         </div>
//         <div className="damage">
//           <img className="swordImage" src="/assets/images/sword.svg" alt="Sword" />
//           <span className="damageText"> {damage} </span>
//         </div>
//       </div>
//     );
//   };

//   export default HpDmgFooter;
import React from "react";
import {
  ICard,
  ICardCritter,
  ICardItem,
} from "combatcritters-ts/src/objects";
import { ICardVisitor } from "combatcritters-ts/src/ICardVisitor";
import "./hpDmgFooter.css"
import { Rarity } from "api/Rarity";


const HpDmgFooter: React.FC<{ card: ICard }> = ({ card }) => {
  let content: React.ReactNode = null;
  let isVisible = true;

  const visitor: ICardVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      content = (
        <div className={`footerRoot ${Rarity[card.rarity]}`}>
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
