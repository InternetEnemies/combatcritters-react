/**
 * @Created 2024-11-26
 * @Brief The health and elixir bar used in battles.
 */

import "./elixirHealthBar.css";

interface ElixirHealthBarProps {
  currAmount: number;
  maxAmount: number;
  isUsersBar: boolean;
  isHealth: boolean;
}

const ElixirHealthBar: React.FC<ElixirHealthBarProps> = ({
  currAmount,
  maxAmount,
  isUsersBar,
  isHealth,
}) => {
  return (
    <div
      className={`elixirHealthBarRoot 
        ${isHealth ? "health" : "elixir"} 
        ${!isUsersBar ? "reversed" : ""}`}
    >
      <div className="elixirHealthInfo">
        {currAmount}/{maxAmount}
      </div>
      <div className="elixirHealthBar">
        <div className="segmentsContainer">
          {Array.from({ length: maxAmount }).map((_, i) => (
            <div key={i} className="segment"></div>
          ))}
        </div>

        <div
          className="barPercentage"
          style={{
            height: `${(currAmount / maxAmount) * 100}%`,
          }}
        ></div>
      </div>
      <img
        className="elixirHeartImage"
        src={isHealth ? "assets/images/heart.svg" : "assets/images/elixir.svg"}
        alt="Heart"
      />
    </div>
  );
};

export default ElixirHealthBar;
