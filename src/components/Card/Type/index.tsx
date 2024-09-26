import './type.css'

interface Props {
    type: string;
  }
  
  const Type: React.FC<Props> = ({ type }) => {
    const getImagePath = (type: string) => {
      if(type === "critter") {
        return "/assets/images/critter.svg";
      }
      else {
        return "/assets/images/item.svg";
      }
    };
  
    return (
      <img
        className="typeImage"
        src={getImagePath(type)}
      />
    );
  };
  
  export default Type;
  