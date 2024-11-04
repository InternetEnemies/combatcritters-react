/**
 * @Created 2024-10-07
 * @Brief The Pack view that is used throughout the application.
 */

import { IPack } from "combatcritters-ts";
import "./pack.css";
import {ClientSingleton} from "../../ClientSingleton";

interface PackProps {
  pack: IPack;
  onClick?: (pack?: IPack) => void; // Can be called with or without the pack parameter.
  style?: React.CSSProperties;
  scale?: number; //Scale the size of the pack
}

const Pack: React.FC<PackProps> = ({
  pack,
  onClick = () => {},
  style,
  scale = 1,
}) => {
  const WIDTH: number = 132.6 * scale; //Default width of the pack * scale

  const handleClick = () => {
    onClick?.(pack); // Pass the pack if provided.
  };

  return (
    <div
      onClick={handleClick}
      className="packRoot"
      style={{ ...style, width: `${WIDTH}px` }}
    >
      <span className="packName">{pack.name}</span>
      <img src={`${ClientSingleton.mediaRoot}/${pack.image}`} className="packImage" alt="Pack" />
    </div>
  );
};

export default Pack;
