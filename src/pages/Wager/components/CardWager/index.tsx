/**
 * @Created 2024-11-18
 * @Brief The card view used in the wagering page.
 */
import React from "react";
import "./cardWager.css";
import Card from "components/Card";
import { ICard, IItemStack } from "combatcritters-ts";

interface CardWagerProps {
  cardStack: IItemStack<ICard>;
  onClick: (card: ICard) => void;
  iconPath: string;
  scale ?: number;
}

const CardWager: React.FC<CardWagerProps> = ({
  cardStack,
  onClick,
  iconPath,
  scale
}) => {
  return (
    <div className="cardWagerRoot">
      <Card
        card={cardStack.getItem()}
        cardCount={cardStack.getAmount()}
        style={{ cursor: "default" }}
        scale={scale}
      />
      <img
        className="addCardIcon"
        src={iconPath}
        onClick={() => onClick(cardStack.getItem())}
      />
    </div>
  );
};

export default CardWager;
