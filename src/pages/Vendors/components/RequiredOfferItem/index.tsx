/**
 * @Created 2024-10-24
 * @Brief Displays the required items in an offer and the amount of that item the use has.
 */

import { ICard, ICurrency, IPack, ITradeItem } from "combatcritters-ts";
import "./requiredOfferItem.css";
import Item from "components/Item";

interface RequiredOfferItemProps {
  tradeItem: ITradeItem<IPack | ICard | ICurrency>;
}

const RequiredOfferItem: React.FC<RequiredOfferItemProps> = ({ tradeItem}) => {
  return (
    <div className="requiredOfferItemRoot">
      <span>x{tradeItem.userItem.getAmount()}/{tradeItem.giveItem.getAmount()}</span>
      <Item item={tradeItem.giveItem.getItem()} scaleCard={.75} scalePack={.75}/>
    </div>
  );
};

export default RequiredOfferItem;
