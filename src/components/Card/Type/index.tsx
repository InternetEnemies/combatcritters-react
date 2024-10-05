import './type.css'
import { ICard, ICardCritter, ICardItem } from 'combatcritters-ts/src/objects';
import { ICardVisitor } from 'combatcritters-ts/src/ICardVisitor';

interface Props {
    type: string;
  }
  
  const Type: React.FC<{ card: ICard }> = ({ card }) => {
    let imagePath;

    const visitor: ICardVisitor = {
      visitCritter: (critter: ICardCritter): void => {
        imagePath = "/assets/images/critter.svg";
      },
      visitItem: (item: ICardItem): void => {
        imagePath = "/assets/images/item.svg";
      },
    };

    card.accept(visitor);



    return <img className="typeImage" src={imagePath} />;
  };
  
  export default Type;
  