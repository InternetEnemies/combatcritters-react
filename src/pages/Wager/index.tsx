/**
 * @Created 2024-11-15
 * @Brief Wager page component that allows users to wager against their matched opponent.
 */

import "./wager.css";
import { useEffect, useState } from "react";
import {
  ICard,
  ICurrency,
  IItem,
  IItemStack,
  IPack,
  ItemStack,
} from "combatcritters-ts";
import UserWager from "./components/UserWager";
import { useCurrency } from "contexts/CurrencyContext";
import { ClientSingleton } from "ClientSingleton";
import CardWager from "./components/CardWager";
import PackWager from "./components/PackWager";
import CurrencyWager from "./components/CurrencyWager";
import Popup from "components/Popup";
import InputCurrencyPopup from "./components/InputCurrencyPopup";
import ReadyUp from "./components/ReadyUp";
import { getID, getUpdatedItems } from "./utils/itemUtils";
import { toast } from "react-toastify";
import OpponentWager from "./components/OpponentWager";

const Wager = () => {
  /**
   * Cards, packs, and currency in the user's inventory
   */
  const [inventoryCards, setInventoryCards] = useState<IItemStack<ICard>[]>([]);
  const [inventoryPacks, setInventoryPacks] = useState<IItemStack<IPack>[]>([]);
  const { userCurrency } = useCurrency();
  const [inventoryCurrency, setInventoryCurrency] =
    useState<ICurrency>(userCurrency);

  /**
   * Cards, packs, and currency in the user's wager
   */
  const [wageredCards, setWageredCards] = useState<IItemStack<ICard>[]>([]);
  const [wageredPacks, setWageredPacks] = useState<IItemStack<IPack>[]>([]);
  const [wageredCurrency, setWageredCurrency] = useState<ICurrency | null>(
    null
  );

  const [opponentWager, setOpponentWager] = useState<IItem[]>([]);

  const [ready, setReady] = useState<boolean>(false);

  const [popupVisible, setPopupVisible] = useState<boolean>(false);

  /**
   * On mount, fetch the cards and packs in the user's inventory.
   */
  useEffect(() => {
    const setInventory = async () => {
      try {
        const cardQuery = ClientSingleton.getInstance().cards.getBuilder();
        cardQuery.setOwned(true);
        setInventoryCards(
          await ClientSingleton.getInstance().user.cards.getCards(
            cardQuery.build()
          )
        );

        setInventoryPacks(
          await ClientSingleton.getInstance().user.packs.getPacks()
        );
      } catch (error) {
        console.log("Error fetching user inventory: " + error);
      }
    };

    setInventory();
  }, []);

  /**
   * Updates the wagered items based on an item (card or pack) clicked in the inventory.
   *
   * @param item - The item clicked in the inventory (e.g., a card or a pack).
   * @param inventoryItems - The cards or packs in the user's inventory.
   * @param setInventoryItems - Setter for the cards or packs in the user's inventory.
   * @param wageredItems - The current list of wagered items.
   * @param setWageredItems - Callback function to update the wager. This will be either setWageredCards or setWageredPacks
   */
  const onInventoryClickHelper = <T extends ICard | IPack>(
    item: T,
    inventoryItems: IItemStack<T>[],
    setInventoryItems: (items: IItemStack<T>[]) => void,
    wageredItems: IItemStack<T>[],
    setWageredItems: (card: IItemStack<T>[]) => void
  ) => {
    //itemStack corresponding to item in inventoryItems
    const inventoryItemStack = inventoryItems.find(
      (inventoryItemStack) =>
        getID(inventoryItemStack.getItem()) === getID(item)
    );

    //The index of item in the wageredItems
    const wagerIndex = wageredItems.findIndex(
      (inventoryItemStack) =>
        getID(inventoryItemStack.getItem()) === getID(item)
    );

    //New wagered items after adding or incrementing item
    const newWageredItems = [...wageredItems];

    if (wagerIndex >= 0 && inventoryItemStack) {
      //If item exists in wageredItems
      if (inventoryItemStack && inventoryItemStack.getAmount() > 0) {
        //Only increment the item's count if the user has the required amount in their inventory
        const wageredItemStack = newWageredItems[wagerIndex];
        newWageredItems[wagerIndex] = new ItemStack(
          item,
          wageredItemStack.getAmount() + 1
        );
        setInventoryItems(getUpdatedItems(item, inventoryItems, -1));
      } else {
        toast("Can't add to wager", { toastId: "cantAdd" });
      }
    } else if (inventoryItemStack) {
      //This item hasn't been added to the wager yet
      newWageredItems.push(new ItemStack(item, 1));
      setInventoryItems(getUpdatedItems(item, inventoryItems, -1));
    } 

    setWageredItems(newWageredItems);
  };

  /**
   * On inventory card click, add the card to the wager (if valid)
   *
   * @param card - The card to add
   */
  const onInventoryCardClick = (card: ICard) => {
    onInventoryClickHelper(
      card,
      inventoryCards,
      setInventoryCards,
      wageredCards,
      setWageredCards
    );
  };

  /**
   * On pack click, add the pack to the wager (if valid)
   *
   * @param pack - The pack to add
   */
  const onInventoryPackClick = (pack: IPack) => {
    onInventoryClickHelper(
      pack,
      inventoryPacks,
      setInventoryPacks,
      wageredPacks,
      setWageredPacks
    );
  };

  return (
    <>
      <div className="wagerRoot">
        <div className="wagerContainer">
          <span className="wagerTitle">Wager Against Opponent</span>
          <div className="wagerInnerContainer">
            <div className="wageredItems">
              <div className="opponentAndUserWager"><OpponentWager/></div>
              <div className="opponentAndUserWager">
                <UserWager
                  inventoryCards={inventoryCards}
                  setInventoryCards={setInventoryCards}
                  inventoryPacks={inventoryPacks}
                  setInventoryPacks={setInventoryPacks}
                  inventoryCurrency={inventoryCurrency}
                  setInventoryCurrency={setInventoryCurrency}
                  wageredCards={wageredCards}
                  setWageredCards={setWageredCards}
                  wageredPacks={wageredPacks}
                  setWageredPacks={setWageredPacks}
                  wageredCurrency={wageredCurrency}
                  setWageredCurrency={setWageredCurrency}
                  setReady={setReady}
                />
              </div>
            </div>
            <div className="wagerInventory">
              <CurrencyWager
                key={"currency"}
                currency={inventoryCurrency}
                onClick={() => {
                  setPopupVisible(true);
                }}
                iconPath="assets/images/add.svg"
              />
              {inventoryCards.map((cardStack) => {
                return (
                  <CardWager
                    cardStack={cardStack}
                    onClick={onInventoryCardClick}
                    iconPath="assets/images/add.svg"
                    key={cardStack.getItem().name}
                  />
                );
              })}
              {inventoryPacks.map((packStack) => {
                return (
                  <PackWager
                    packStack={packStack}
                    onClick={onInventoryPackClick}
                    iconPath="assets/images/add.svg"
                    key={packStack.getItem().name}
                  />
                );
              })}
            </div>
          </div>
          <ReadyUp isReady={ready} setIsReady={setReady} />
        </div>
      </div>
      {
        <Popup
          popupContent={
            <InputCurrencyPopup
              inventoryCurrency={inventoryCurrency}
              wageredCurrency={wageredCurrency}
              setWageredCurrency={setWageredCurrency}
              setInventoryCurrency={setInventoryCurrency}
              setPopupVisible={setPopupVisible}
              setReady={setReady}
            />
          }
          isVisible={popupVisible}
          setIsVisible={setPopupVisible}
        />
      }
    </>
  );
};

export default Wager;
