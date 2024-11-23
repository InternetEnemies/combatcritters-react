/**
 * @Created 2024-11-18
 * @Brief The user's wager.
 */

import React, { useEffect } from "react";
import "./../../styles/sharedWager.css";
import {
  Currency,
  ICard,
  ICurrency,
  IItemStack,
  IPack,
  ItemStack,
} from "combatcritters-ts";
import Card from "components/Card";
import CardWager from "../CardWager";
import PackWager from "../PackWager";
import CurrencyWager from "../CurrencyWager";

import { getUpdatedItems, getID } from "pages/Wager/utils/itemUtils";

interface UserWagerProps {
  inventoryCards: IItemStack<ICard>[];
  setInventoryCards: (card: IItemStack<ICard>[]) => void;
  inventoryPacks: IItemStack<IPack>[];
  setInventoryPacks: (pack: IItemStack<IPack>[]) => void;
  inventoryCurrency: ICurrency;
  setInventoryCurrency: (currency: ICurrency) => void;
  wageredCards: IItemStack<ICard>[];
  setWageredCards: (card: IItemStack<ICard>[]) => void;
  wageredPacks: IItemStack<IPack>[];
  setWageredPacks: (pack: IItemStack<IPack>[]) => void;
  wageredCurrency: ICurrency | null;
  setWageredCurrency: (currency: ICurrency | null) => void;
  setReady: (ready: boolean) => void;
}

const UserWager: React.FC<UserWagerProps> = ({
  inventoryCards,
  setInventoryCards,
  inventoryPacks,
  setInventoryPacks,
  inventoryCurrency,
  setInventoryCurrency,
  wageredCards,
  setWageredCards,
  wageredPacks,
  setWageredPacks,
  wageredCurrency,
  setWageredCurrency,
  setReady,
}) => {
  useEffect(() => {
    setReady(false);
  }, [wageredCards, wageredPacks, wageredCurrency]);

  /**
   * Handles the logic for remvoving a pack or card from the wager.
   *
   * @param item - The specific card or pack that is being removed from the wager.
   * @param inventoryItems - The user's current inventory state
   * @param setInventoryItems - Callback function to set the user's inventory
   * @param wageredItems - Current wagered items (cards or packs)
   * @param setWageredItems - Callback to set the wagered items
   */
  const onWagerClickHelper = <T extends ICard | IPack>(
    item: T,
    inventoryItems: IItemStack<T>[],
    setInventoryItems: (items: IItemStack<T>[]) => void,
    wageredItems: IItemStack<T>[],
    setWageredItems: (card: IItemStack<T>[]) => void
  ) => {
    //Index of item in wageredItems
    const wagerIndex = wageredItems.findIndex(
      (itemStack) => getID(itemStack.getItem()) === getID(item)
    );
    const newWager = [...wageredItems];

    const itemStack = newWager[wagerIndex];

    if (itemStack.getAmount() === 1) {
      // Remove the item from the wager if its amount is 1
      newWager.splice(wagerIndex, 1);
    } else {
      // Decrease the amount by 1
      newWager[wagerIndex] = new ItemStack(item, itemStack.getAmount() - 1);
    }
    setWageredItems(newWager);

    setInventoryItems(getUpdatedItems(item, inventoryItems, 1));
  };

  /**
   * Remove the clicked card from the wager
   *
   * @param card - The card clicked
   */
  const onCardClick = (card: ICard) => {
    onWagerClickHelper(
      card,
      inventoryCards,
      setInventoryCards,
      wageredCards,
      setWageredCards
    );
  };

  /**
   * Remove the clicked pack from the wager
   *
   * @param pack - The pack clicked
   */
  const onPackClick = (pack: IPack) => {
    onWagerClickHelper(
      pack,
      inventoryPacks,
      setInventoryPacks,
      wageredPacks,
      setWageredPacks
    );
  };

  /**
   * Remove currency from the wager
   */
  const onCurrencyClick = () => {
    setInventoryCurrency(
      new Currency(inventoryCurrency.coins + (wageredCurrency?.coins ?? 0))
    );
    setWageredCurrency(null);
  };

  return (
    <div className="sharedWagerRoot">
      <span className="sharedWagerText">Your Wagered Items</span>
      <div className="separator"></div>
      <div className="sharedWageredItems">
        {wageredCurrency ? (
          <CurrencyWager
            currency={wageredCurrency}
            onClick={onCurrencyClick}
            iconPath="assets/images/remove.svg"
          />
        ) : (
          <></>
        )}
        {wageredCards.map((cardStack) => (
          <CardWager
            cardStack={cardStack}
            onClick={onCardClick}
            iconPath="assets/images/remove.svg"
            key={cardStack.getItem().name}
          />
        ))}
        {wageredPacks.map((packStack) => (
          <PackWager
            packStack={packStack}
            onClick={onPackClick}
            iconPath="assets/images/remove.svg"
            key={packStack.getItem().name}
          />
        ))}
      </div>
    </div>
  );
};

export default UserWager;
