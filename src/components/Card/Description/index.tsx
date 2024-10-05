import "./description.css"
import { ICard, ICardCritter, ICardItem } from "combatcritters-ts/src/objects";
import { ICardVisitor } from "combatcritters-ts/src/ICardVisitor";

interface Props {
  description: string;
  type: string;
}
  
const Description: React.FC<{ card: ICard }> = ({ card }) => {
  let className = "critter"; //Default to critter

  const visitor: ICardVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      className = "descriptionRoot critter";
    },
    visitItem: (item: ICardItem): void => {
      className = "descriptionRoot item";
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
  