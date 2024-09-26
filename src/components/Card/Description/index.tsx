import "./description.css"

interface Props {
  description: string;
  type: string;
}
  
const Description: React.FC<Props> = ({ description, type }) => {
  return (
    <div className={`descriptionRoot ${type}`}>
        <span>{description}</span>
    </div>
  );
};

export default Description;
  