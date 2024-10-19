import React from "react";
import Header from "./Header";
import CardImage from "./CardImage";
import HpDmgFooter from "./HpDmgFooter";
import Abilities from "./Abilities";
import Description from "./Description";
import PlayCost from "./PlayCost";
import Type from "./Type";
import "./card.css";
import CardCount from "./CardCount";
import { ICard } from "combatcritters-ts/src/objects";
import { CardRarity } from "combatcritters-ts/src/objects";

interface CardProps {
  card: ICard;
  cardCount?: number;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ card, cardCount, style }) => {
  return (
    <div className={`cardRoot ${CardRarity[card.rarity]}`} style={style}>
      <Header card={card} />
      <div className={`cardInner ${CardRarity[card.rarity]}`}>
        <CardImage imagePath={"/assets/images/cardImage.jpeg"} />
        <Abilities card={card} />
        <Description card={card} />
      </div>
      <HpDmgFooter card={card} />
      <PlayCost playCost={card.playcost} />
      <Type card={card} />
      {cardCount !== undefined && <CardCount amount={cardCount} />}
    </div>
  );
};

export default Card;
