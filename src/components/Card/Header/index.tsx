import './header.css'
import { CardRarity } from 'combatcritters-ts';
import { ICard } from 'combatcritters-ts';
  
  const Header: React.FC<{ card: ICard }> = ({ card }) => {
    return (
      <div className={`headerRoot ${CardRarity[card.rarity]}`}>
        <span className="cardName">{card.name}</span>
      </div>
    );
  };
  
  export default Header;
  