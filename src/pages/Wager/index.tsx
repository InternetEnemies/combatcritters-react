/**
 * @Created 2024-11-15
 * @Brief Wager page component that allows users to wager against their matched opponent.
 */


import Button from "components/Button";
import "./wager.css";
import { useState } from "react";
import { IItem } from "combatcritters-ts";
import UserWager from "./components/UserWager";

const Wager = () => {
    const [userInventory, setUserInventory] = useState<IItem[]>([]);
    const [opponentWager, setOpponentWager] = useState<IItem[]>([]);
    const [userWager, setUserWager] = useState<IItem[]>([]);

  return (
    <div className="wagerRoot">
        <div className="wagerContainer">
            <span>Wager Against Opponent</span>
            <div className="wagerInnerContainer">
                <div className="wageredItems">
                    <div className="opponentAndUserWager"><UserWager/></div>
                    <div className="opponentAndUserWager"></div>
                </div>
                <div className="wagerInventory"></div>
            </div>
            <Button text="???" onClick={()=>{}}/>
        </div>
    </div>
  );
};

export default Wager;
