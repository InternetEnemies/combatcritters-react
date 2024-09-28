import Header from "./Header";
import CardImage from "./CardImage";
import HpDmgFooter from "./HpDmgFooter";
import Abilities from "./Abilities";
import Description from "./Description";
import PlayCost from "./PlayCost";
import Type from "./Type";
import "./card.css";
import CardCount from "./CardCount";

interface CardProps {
  id: number;
  rarity: string;
  name: string;
  playCost: number;
  imagePath: string;
  abilities: number[];
  type: string;
  description: string;
  hp: number;
  damage: number;
  cardCount?: number;
}

const Card: React.FC<CardProps> = ({
  rarity,
  name,
  playCost,
  imagePath,
  abilities,
  type,
  description,
  hp,
  damage,
  cardCount,
}) => {
  return (
    <div className={`cardRoot ${rarity}`}>
      <Header name={name} rarity={rarity} />
      <div className={`cardInner ${rarity}`}>
        <CardImage imagePath={imagePath} />
        {type === "critter" && <Abilities abilities={abilities} />}
        <Description description={description} type={type} />
      </div>
      <HpDmgFooter hp={hp} damage={damage} rarity={rarity} type={type} />
      <PlayCost playCost={playCost} />
      <Type type={type} />
      {cardCount !== undefined && <CardCount amount={cardCount}/>}
    </div>
  );
};

export default Card;
