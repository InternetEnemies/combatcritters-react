import './header.css'
import { Rarity } from 'api/Rarity';

interface Props {
    name: string;
    rarity: number;
  }
  
  const Header: React.FC<Props> = ({ name, rarity }) => {
    return (
        <div className={`headerRoot ${Rarity[rarity]}`} >
          <span className="cardName">{name}</span>
        </div>
      );
    };
  
  export default Header;
  