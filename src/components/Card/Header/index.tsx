import './header.css'

interface Props {
    name: string;
    rarity: string;
  }
  
  const Header: React.FC<Props> = ({ name, rarity }) => {
    return (
        <div className={`headerRoot ${rarity}`} >
          <span className="cardName">{name}</span>
        </div>
      );
    };
  
  export default Header;
  