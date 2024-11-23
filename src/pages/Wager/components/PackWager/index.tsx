/**
 * @Created 2024-11-18
 * @Brief The pack component view used in the wagering page.
 */
import React from "react";
import "./packWager.css";
import { IItemStack, IPack } from "combatcritters-ts";
import Pack from "components/Pack";

interface PackWagerProps {
  packStack: IItemStack<IPack>;
  onClick: (pack: IPack) => void;
  iconPath: string;
}

const PackWager: React.FC<PackWagerProps> = ({
  packStack,
  onClick,
  iconPath,
}) => {
  return (
    <div className="packWagerRoot">
      <Pack
        pack={packStack.getItem()}
        packCount={packStack.getAmount()}
        style={{ cursor: "default" }}
        scale={0.95}
      />
      <img
        className="addPackIcon"
        src={iconPath}
        onClick={() => onClick(packStack.getItem())}
      />
    </div>
  );
};

export default PackWager;
