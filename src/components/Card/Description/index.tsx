import "./description.css"
import { ICard, ICardCritter, ICardItem } from "combatcritters-ts/src/objects";
import { ICardVisitor } from "combatcritters-ts";
  
const Description: React.FC<{ card: ICard }> = ({ card }) => {
  let className = "critter"; //Default to critter

  const visitor: ICardVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      className = "critter";
    },
    visitItem: (item: ICardItem): void => {
      className = "item";
    },
  };

  card.accept(visitor);

  return (
    <div className={`descriptionRoot ${className}`}>
      <span>{card.description}</span>
    </div>
  );
};

export default Description;
  