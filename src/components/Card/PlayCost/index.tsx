import './playCost.css'

interface Props {
    playCost: number;
  }
  
  const PlayCost: React.FC<Props> = ({ playCost }) => {
    return (
        <div className="playCostRoot" >
          <span className="playCost">{playCost}</span>
        </div>
      );
    };
  
  export default PlayCost;
  