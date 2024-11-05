/**
 * @Created 2024-10-24
 * @Brief Displays information about the selected offer and provides a purchase button.
 */

import {
  ICard,
  ICurrency,
  IOffer,
  IPack,
  IUserOfferState,
  IVendorReputation,
} from "combatcritters-ts";
import "./selectedOffer.css";
import { useEffect, useState } from "react";
import RequiredOfferItem from "../RequiredOfferItem";
import Item from "components/Item";
import Button from "components/Button";
import { toast } from "react-toastify";
import { useCurrency } from "contexts/CurrencyContext";

interface SelectedOfferProps {
  offer: IOffer | null;
  vendorName: string;
  onOfferAccept: (reputation: IVendorReputation) => void; //Update the vendor's reputation on offer accept.
}

const SelectedOffer: React.FC<SelectedOfferProps> = ({
  offer,
  vendorName,
  onOfferAccept,
}) => {
  const [userOfferState, setUserOfferState] = useState<IUserOfferState<
    IPack | ICard | ICurrency
  > | null>(null);

  const { handleTransaction } = useCurrency();

  const handleDealClick = () => {
    const acceptOffer = async () => {
      if (offer) {
        try {
          const acceptOffer = async () => {
            let purchaseStatus = await offer.accept();
            onOfferAccept(purchaseStatus.reputation);
          };

          await handleTransaction(acceptOffer); //CurrencyContext should handle transaction

          toast("Transaction Successful!", { toastId: "transactionSuccessful" });
        } catch (error) {
          console.log("Error accepting offer:" + error);
          toast("Error accepting offer");
          return;
        }
      }
    };

    if (userOfferState?.canPurchase) {
      acceptOffer();
    } else {
      toast("Missing Required Items");
    }
  };

  /**
   * On offer change, fetch userOfferState from the backend.
   */
  useEffect(() => {
    const fetchUserOfferState = async () => {
      if (offer) {
        const fetchedOfferState = await offer.compareUserItems();
        setUserOfferState(fetchedOfferState);
      } else {
        setUserOfferState(null);
      }
    };

    fetchUserOfferState();
  }, [offer]);

  if (!offer) {
    return null;
  }

  return (
    <div className="selectedOfferRoot">
      <div className="vendorReceivesContainer">
        <span className="selectedOfferText">{vendorName} Receives:</span>
        <div className="vendorReceivesGrid">
          {userOfferState?.userOfferItems.map((offerItem, index) => (
            <RequiredOfferItem key={index} userOfferItem={offerItem} />
          ))}
        </div>
      </div>
      <div className="youReceiveContainer">
        <span className="selectedOfferText">You Receive:</span>
        <Item item={offer.receiveItem.getItem()} />
      </div>
      <div className="dealButtonWrapper">
        <Button text="Deal" onClick={handleDealClick} />
      </div>
    </div>
  );
};

export default SelectedOffer;
