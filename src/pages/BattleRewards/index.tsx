import { useEffect, useState } from "react";
import Button from "components/Button";
import "./battleRewards.css";
import {
  ICard,
  ICardItem,
  ICurrency,
  IItemVisitor,
  IPack,
} from "combatcritters-ts";
import Pack from "components/Pack";
import CurrencyComp from "components/CurrencyComp";
import Card from "components/Card";
import { useNavigate } from "react-router-dom";
import { useBattleState } from "contexts/BattleStateContext";

const BattleRewards = () => {
  const navigate = useNavigate();
  const { rewards, type } = useBattleState();
  const [rewardsComponents, setRewardsComponents] = useState<JSX.Element[]>([]);
  const [mainMessage, setMainMessage] = useState<string>("");
  const [buttonMessage, setButtonMessage] = useState<string>("");


  useEffect(() => {
    if (type === "win") {
      setMainMessage("You Won!");
      setButtonMessage("Claim Victory");
    } else if (type === "loss") {
      setMainMessage("You were defeated");
      setButtonMessage("Claim Defeat");
    } else {
      setMainMessage("It's a Tie!");
      setButtonMessage("Claim Mediocrity");
    }
  },[rewards, type])
  

  // Define the ItemVisitor class
  class ItemVisitor implements IItemVisitor {
    visitCritter(card: ICard): JSX.Element {
      const component = <Card card={card} />;
      setRewardsComponents((prev) => [...prev, component]);
      return component;
    }

    visitItem(item: ICardItem): JSX.Element {
      const component = <Card card={item} />;
      setRewardsComponents((prev) => [...prev, component]);
      return component;
    }

    visitPack(pack: IPack): JSX.Element {
      const component = <Pack pack={pack} />;
      setRewardsComponents((prev) => [...prev, component]);
      return component;
    }

    visitCurrency(currency: ICurrency): JSX.Element {
      const component = <CurrencyComp amount={currency.coins} style={{color:"white"}}/>;
      setRewardsComponents((prev) => [...prev, component]);
      return component;
    }
  }

  const itemVisitor = new ItemVisitor();

  /**
   * On mount, render all the components
   */
  useEffect(() => {
    rewards.forEach((item) => {
      item.getItem().accept(itemVisitor);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="battleRewardsRoot">
      <span className="battleRewardsTitle">{mainMessage}</span>

      <div className="rewardsLostContainer">
        <div className="matchRewardsContainer">
          <span>Match Rewards</span>
          <hr className="separator" />
          <div>{rewardsComponents}</div>
        </div>
      </div>
      <Button
        text={buttonMessage}
        onClick={() => {
          navigate("/home");
        }}
      />
    </div>
  );
};

export default BattleRewards;
