/**
 * @Created 2024-10-07
 * @Brief The Pack view that is used throughout the application.
 */

import { IPack } from "combatcritters-ts";
import "./pack.css";

interface PackProps {
  pack: IPack;
  onClick?: (pack: IPack) => void;
  style?: React.CSSProperties;
}

const Pack: React.FC<PackProps> = ({ pack, onClick = () => {}, style }) => {
  const handleClick = () => {
    onClick(pack);
  };

  return (
    <div onClick={handleClick} className="packRoot" style={style}>
      <span className="packName">{pack.name}</span>
      <img src={pack.image} className="packImage" alt="Pack" />
    </div>
  );
};

export default Pack;
