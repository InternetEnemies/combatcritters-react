/**
 * @Created 2024-10-07
 * @Brief The Card view that is used throughout the application.
 */

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
import { ICard } from "combatcritters-ts";
import { CardRarity } from "combatcritters-ts";

interface CardProps {
  card: ICard;
  cardCount?: number;
  style?: React.CSSProperties;
  onClick?: (card?: ICard) => void; // Can be called with or without the card parameter.
  scale?: number; // Scale the size of the card
}

const Card: React.FC<CardProps> = ({
  card,
  cardCount,
  style,
  onClick = () => {},
  scale = 1,
}) => {
  const WIDTH: number = 132.6 * scale; //The default width of the card * scale

  const handleClick = () => {
    onClick?.(card); // Pass the card if provided.
  };

  return (
    <div
      onClick={handleClick}
      className={`cardRoot ${CardRarity[card.rarity]}`}
      style={{ ...style, width: `${WIDTH}px` }}
    >
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
