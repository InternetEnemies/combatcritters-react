import './hpDmgFooter.css'

interface Props {
    hp: number;
    damage: number;
    backgroundColor: string;
  }
  
  const HpDmgFooter: React.FC<Props> = ({ hp, damage, backgroundColor }) => {
    return (
        <div className="footerRoot" style={{backgroundColor}}>
          <span className="hp"> {hp} </span>
          <span className="damage"> {damage} </span>
        </div>
      );
    };
  
  export default HpDmgFooter;
  