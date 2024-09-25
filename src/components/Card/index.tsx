import Header from './Header'
import CardImage from './CardImage'
import HpDmgFooter from './HpDmgFooter'
import AbilitiesAndType from './AbilitiesAndType'
import Description from './Description'
import './card.css'

interface CardProps {
    rarity: string;
    name: string;
    playCost: number;
    imagePath: string;
    abilities: number[];
    type: string;
    description: string;
    hp: number;
    damage: number;
    innerColor: string
  }
  
  const Card: React.FC<CardProps> = ({ rarity, name, playCost, imagePath, abilities, type, description, hp, damage, innerColor }) => {
    return (
      <div className={`cardRoot ${rarity}`}>

        <Header name={name} playCost={playCost} backgroundColor={"#007700"} borderColor={innerColor}/>
        <div className={`cardInner ${rarity}`}>
          <CardImage imagePath={imagePath}/>
          <AbilitiesAndType abilities={abilities} type={type}/>
          <Description description={description}/>
        </div>
        <HpDmgFooter hp={hp} damage={damage} backgroundColor={innerColor}/>
      </div>
    );
  };
  
  export default Card;
  