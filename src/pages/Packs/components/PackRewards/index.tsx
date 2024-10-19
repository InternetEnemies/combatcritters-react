/**
 * @Created 2024-10-17
 * @Brief Popup displaying the contents of an opened pack.
 */
import React from "react";
import Button from "components/Button";
import "./packRewards.css";
import { ICard } from "combatcritters-ts";
import Card from "components/Card";
import { toast } from "react-toastify";

interface PackRewardsProps {
  rewards: ICard[];
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const PackRewards: React.FC<PackRewardsProps> = ({
  rewards,
  isVisible,
  setIsVisible,
}) => {
  const handleCollectClick = () => {
    setIsVisible(false);
    toast("Cards Added to Inventory!");
  };

  /*
    This is hacky. The formatting of the cards was weird when they became scrollable--this fixes it.
  */
  const listClass =
    rewards.length > 5 ? "rewardsListScrollable" : "rewardsList";

  return (
    <div className={`packRewardsRoot ${isVisible ? "visible" : "notVisible"}`}>
      <img
        className="starburstImage"
        src="assets/images/starburst.jpg"
        alt="Starburst"
      />
      <div className={`rewardsContainer ${listClass}`}>
        {rewards.map((card, index) => (
          <div className="rewardsListItem" key={index}>
            <Card card={card} style={{ transform: "scale(1.3)" }} />
          </div>
        ))}
      </div>
      <Button text="Collect" onClick={handleCollectClick} />
    </div>
  );
};

export default PackRewards;
