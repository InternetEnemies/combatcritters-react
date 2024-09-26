import './hpDmgFooter.css'

interface Props {
    hp: number;
    damage: number;
    rarity: string;
  }
  
  const HpDmgFooter: React.FC<Props> = ({ hp, damage, rarity }) => {
    return (
        <div className={`footerRoot ${rarity}`}>
          <div className="hp">
            <img className="hpImage" src="/assets/images/heart.svg"></img>
            <span className="hpText"> {hp} </span></div>
          <div className="damage">
            <img className="swordImage" src="/assets/images/sword.svg"></img>
            <span className="damageText"> {damage} </span></div>
        </div>
      );
    };
  
  export default HpDmgFooter;
  