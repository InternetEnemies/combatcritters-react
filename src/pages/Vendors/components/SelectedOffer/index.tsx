/**
 * @Created 2024-10-24
 * @Brief Displays information about the selected offer and provides a purchase button.
 */

import { ICard, ICurrency, IOffer, IPack, ITradeItem } from "combatcritters-ts";
import "./selectedOffer.css";
import { useEffect, useState } from "react";
import RequiredOfferItem from "../RequiredOfferItem";
import Item from "components/Item";

interface SelectedOfferProps {
  offer: IOffer | null;
  vendorName: string;
}

const SelectedOffer: React.FC<SelectedOfferProps> = ({ offer, vendorName }) => {
  const [tradeItems, setTradeItems] = useState<ITradeItem<IPack | ICard | ICurrency>[]>([]);

  useEffect(() => {
    const fetchTradeItems = async () => {
      if (offer) {
        const tradeItems = await offer.compareUserItems();
        setTradeItems(tradeItems);
      } else {
        setTradeItems([]);
      }
    };

    fetchTradeItems();
  }, [offer]);


  return (
    <div className="selectedOfferRoot">
      <div className="vendorReceivesContainer">
        <h3 className="selectedOfferText">
          {vendorName} Receives:
          {tradeItems.map((tradeItem, index) => {
            return <RequiredOfferItem key={index} tradeItem={tradeItem}/>;
          })}
        </h3>
      </div>
      <div className="youReceiveContainer">
        <h3 className="selectedOfferText">You Receive:</h3>
        {offer ? <Item item={offer.receiveItem.getItem()}/>: <></>}
      </div>
      <div className="purchaseContainer"></div>
    </div>
  );
};

export default SelectedOffer;