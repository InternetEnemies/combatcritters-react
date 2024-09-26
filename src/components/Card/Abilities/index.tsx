import "./abilities.css";

interface Props {
  abilities: number[];
}

const abilityMap: { [key: number]: string } = {
  1: "/assets/images/ability0.svg", 
  2: "/assets/images/ability1.svg", 
  3: "/assets/images/ability2.svg", 
};

const Abilities: React.FC<Props> = ({ abilities }) => {
  return (
    <div className="abilitiesRoot">
      {abilities.map((ability, index) => {
        const src = abilityMap[ability]; 
        return (
          <img
            key={index} 
            src={src}
            className="abilityImage"
          />
        );
      })}
    </div>
  );
};

export default Abilities;
