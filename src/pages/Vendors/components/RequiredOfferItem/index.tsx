/**
 * @Created 2024-10-24
 * @Brief Displays the required items in an offer and the amount of that item the use has.
 */

import { ICard, ICurrency, IPack, IUserOfferItem } from "combatcritters-ts";
import "./requiredOfferItem.css";
import Item from "components/Item";
import { IItemVisitor } from "combatcritters-ts";
import { ICardCritter, ICardItem } from "combatcritters-ts";
import { useState } from "react";
import { useEffect } from "react";
import { useCurrency } from "contexts/CurrencyContext";
import CurrencyComp from "components/CurrencyComp";

interface RequiredOfferItemProps {
  userOfferItem: IUserOfferItem<IPack | ICard | ICurrency>;
}

const RequiredOfferItem: React.FC<RequiredOfferItemProps> = ({
  userOfferItem,
}) => {
  const PACK_CARD_SCALE = 0.75;
  const CURRENCY_SCALE = 1;
  const AMOUNT_MET_COLOUR = "#02e60a";
  const AMOUNT_NOT_MET_COLOUR = "#ff0000";
  let [content, setContent] = useState<React.ReactElement | null>(null);
  const { userCurrency } = useCurrency();

  //Return true iff the user has the necessary amount of cards or packs for the trade.
  const hasRequiredAmount = (): boolean => {
    return (
      userOfferItem.userItem.getAmount() / userOfferItem.giveItem.getAmount() >=
      1
    );
  };

  /**
   * setContent to Card or Pack view
   */
  const visitCardOrPack = () => {
    setContent(
      <div className="requiredOfferItemRoot">
        <span
          style={
            hasRequiredAmount()
              ? { color: AMOUNT_MET_COLOUR }
              : { color: AMOUNT_NOT_MET_COLOUR }
          }
        >
          x{userOfferItem.userItem.getAmount()}/
          {userOfferItem.giveItem.getAmount()}
        </span>
        <Item
          item={userOfferItem.giveItem.getItem()}
          scaleCard={PACK_CARD_SCALE}
          scalePack={PACK_CARD_SCALE}
        />
      </div>
    );
  };

  const visitor: IItemVisitor = {
    visitCritter: (_requiredCritter: ICardCritter): void => {
      visitCardOrPack();
    },
    visitItem: (_requiredItem: ICardItem): void => {
      visitCardOrPack();
    },
    visitCurrency: (requiredCurrency: ICurrency): void => {
      const hasRequiredCurrency = (): boolean => {
        return userCurrency.coins >= requiredCurrency.coins;
      };
      setContent(
        <CurrencyComp
          amount={requiredCurrency.coins}
          scale={CURRENCY_SCALE}
          style={
            hasRequiredCurrency()
              ? { color: AMOUNT_MET_COLOUR }
              : {
                  color: AMOUNT_NOT_MET_COLOUR,
                }
          }
        />
      );
    },
    visitPack: (_requiredPack: IPack): void => {
      visitCardOrPack();
    },
  };

  /**
   * On userOfferItem change, create the view for userOfferItem.
   */
  useEffect(() => {
    userOfferItem.giveItem.getItem().accept(visitor);
    // eslint-disable-next-line
  }, [userOfferItem]);

  return content;
};

export default RequiredOfferItem;
