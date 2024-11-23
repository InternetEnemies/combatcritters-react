/**
 * @Created 2024-11-22
 * @Brief Utility functions for cards and packs.
 */

import {
  ICard,
  ICardCritter,
  ICardItem,
  ICurrency,
  IItemStack,
  IItemVisitor,
  IPack,
  ItemStack,
} from "combatcritters-ts";

/**
 * Updates the quantity of a specific item (card or pack) in the provided list of items.
 * If the item exists in the list, its quantity is adjusted by the specified amount.
 *   
 * @param item - The specific card or pack whose quantity needs to be updated.
 * @param items - An array of item stacks.
 * @param amount - The quantity to adjust for the specified item. .
 * @returns A new array of item stacks with the updated quantity for the specified item. 
 */
export const getUpdatedItems = <T extends ICard | IPack>(
  item: T,
  items: IItemStack<T>[],
  amount: number
): IItemStack<T>[] => {
  const updatedItems = [...items];
  const itemIndex = items.findIndex(
    (itemStack) => getID(itemStack.getItem()) === getID(item)
  );

  if (itemIndex === -1) return items; // Return an unmodified list if item is not found in items.

  const currentAmount = updatedItems[itemIndex].getAmount();

  updatedItems[itemIndex] = new ItemStack(item, currentAmount + amount);
  return updatedItems;
};


/**
 * Utility function for getting the id from a card or pack. (...I feel like I shouldn't be doing this)
 * 
 * @param item - The item (card or pack) to get the ID for
 * @returns The id of the item
 */
export const getID = (item: ICard | IPack) => {
  let id = -1;
  const idVisitor: IItemVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      id = critter.cardid;
    },
    visitItem: (item: ICardItem): void => {
      id = item.cardid;
    },
    visitCurrency: (currency: ICurrency): void => {},
    visitPack: (pack: IPack): void => {
      id = pack.packid;
    },
  };
  item.accept(idVisitor);
  return id;
};
