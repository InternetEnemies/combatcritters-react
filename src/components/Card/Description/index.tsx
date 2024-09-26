import "./description.css"

interface Props {
  description: string;
}
  
const Description: React.FC<Props> = ({ description }) => {
  return (
    <div className="descriptionRoot">
        <span>{description}</span>
    </div>
  );
};

export default Description;
  