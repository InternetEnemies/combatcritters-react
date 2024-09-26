import './hpDmgFooter.css'

interface Props {
    hp: number;
    damage: number;
    rarity: string;
    type: string
  }
  
  const HpDmgFooter: React.FC<Props> = ({ hp, damage, rarity, type }) => {
    const visibilityClass = type === "item" ? "invisible" : "";
  
    return (
      <div className={`footerRoot ${rarity} ${visibilityClass}`}>
        <div className="hp">
          <img className="hpImage" src="/assets/images/heart.svg" alt="Heart" />
          <span className="hpText"> {hp} </span>
        </div>
        <div className="damage">
          <img className="swordImage" src="/assets/images/sword.svg" alt="Sword" />
          <span className="damageText"> {damage} </span>
        </div>
      </div>
    );
  };
  
  
  export default HpDmgFooter;
  