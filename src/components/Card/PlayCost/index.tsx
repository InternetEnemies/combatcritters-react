import './playCost.css'

interface Props {
    playCost: number;
  }
  
  const PlayCost: React.FC<Props> = ({ playCost }) => {
    return (
      <div className="playCostRoot">
        <img src="assets/images/cardElixir.svg" className="elixirImage" alt={"Elixir"}></img>
        <span className="playCost">{playCost}</span>
      </div>
    );
    };
  
  export default PlayCost;
  