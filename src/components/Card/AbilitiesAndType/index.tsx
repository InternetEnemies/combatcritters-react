import "./abilitiesAndType.css"
interface Props {
    abilities: number[],
    type: string
  }
  
  const AbilitiesAndType: React.FC<Props> = ({ abilities, type }) => {
    return (
      <div className="abilitiesRoot">
      </div>
    );
  };
  
  export default AbilitiesAndType;
  