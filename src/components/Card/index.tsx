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
import { Rarity } from "api/Rarity";

interface CardProps {
  card: ICard;
  cardCount?: number;
}

const Card: React.FC<CardProps> = ({ card, cardCount }) => {
  return (
    <div className={`cardRoot ${Rarity[card.rarity]}`}>
      <Header name={card.name} rarity={card.rarity} />
      <div className={`cardInner ${Rarity[card.rarity]}`}>
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
