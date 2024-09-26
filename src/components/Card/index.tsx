import Header from './Header'
import CardImage from './CardImage'
import HpDmgFooter from './HpDmgFooter'
import AbilitiesAndType from './Abilities'
import Description from './Description'
import PlayCost from './PlayCost'
import Type from './Type'
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
  }
  
  const Card: React.FC<CardProps> = ({ rarity, name, playCost, imagePath, abilities, type, description, hp, damage }) => {
    return (
      <div className={`cardRoot ${rarity}`}>

        <Header name={name} rarity={rarity}/>
        <div className={`cardInner ${rarity}`}>
          <CardImage imagePath={imagePath}/>
          <AbilitiesAndType abilities={abilities}/>
          <Description description={description}/>
        </div>
        <HpDmgFooter hp={hp} damage={damage} rarity={rarity}/>
        <PlayCost playCost={playCost}/>
        <Type type={type}/>
      </div>
    );
  };
  
  export default Card;
  