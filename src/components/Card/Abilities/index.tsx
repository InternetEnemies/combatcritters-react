import "./abilities.css";
import { ICard, ICardCritter, ICardItem } from "combatcritters-ts";
import { ICardVisitor } from "combatcritters-ts";
const abilityMap: { [key: number]: string } = {
  0: "/assets/images/ability0.svg",
  1: "/assets/images/ability1.svg",
  2: "/assets/images/ability2.svg",
};

const Abilities: React.FC<{ card: ICard }> = ({ card }) => {
  let content: React.ReactNode = null;

  const visitor: ICardVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      content = (
        <div className="abilitiesRoot">
          {critter.abilities &&
            critter.abilities.map((ability, index) => {
              const src = abilityMap[ability];
              return <img key={index} src={src} className="abilityImage" alt="Abilitiy of something"/>;
            })}
        </div>
      );
    },
    visitItem: (item: ICardItem): void => {
      content = null;
    },
  };

  card.accept(visitor);

  return (content);
};

export default Abilities;
