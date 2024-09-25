import "./cardImage.css"

interface Props {
  imagePath: string;
}
  
const CardImage: React.FC<Props> = ({ imagePath }) => {
  return (
    <img src={imagePath}/>
  );
};

export default CardImage;
  