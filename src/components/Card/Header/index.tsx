import './header.css'
import { CardRarity } from 'combatcritters-ts';

interface Props {
    name: string;
    rarity: number;
  }
  
  const Header: React.FC<Props> = ({ name, rarity }) => {
    return (
        <div className={`headerRoot ${CardRarity[rarity]}`} >
          <span className="cardName">{name}</span>
        </div>
      );
    };
  
  export default Header;
  