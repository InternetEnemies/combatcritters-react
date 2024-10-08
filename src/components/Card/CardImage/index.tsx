import "./cardImage.css"

interface Props {
  imagePath: string;
}
  
const CardImage: React.FC<Props> = ({ imagePath }) => {
  return (
    <img alt="Card" className="cardImage" src={imagePath}/>
  );
};

export default CardImage;
  