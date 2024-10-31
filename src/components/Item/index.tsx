/**
 * @Created 2024-10-28
 * @Brief View for IItem.
 */

import React from "react";
import {
  ICardCritter,
  ICardItem,
  ICurrency,
  IItemVisitor,
  IPack,
} from "combatcritters-ts/src/objects";
import Card from "components/Card";
import Pack from "components/Pack";
import { ICard } from "combatcritters-ts";
import Currency from "components/CurrencyComp";

interface ItemProps {
  item: IPack | ICard | ICurrency;
  scaleCard?: number; //Scale the size of the card item
  scalePack?: number; //Scale the size of the pack item
  scaleCurrency?: number; //Scale the size of the currency item
}

const Item: React.FC<ItemProps> = ({
  item,
  scaleCard = 1,
  scaleCurrency = 1,
  scalePack = 1,
}) => {
  let content: React.ReactNode = null;

  const visitor: IItemVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      content = <Card card={critter} scale={scaleCard} />;
    },
    visitItem: (item: ICardItem): void => {
      content = <Card card={item} scale={scaleCard} />;
    },
    visitCurrency: (currency: ICurrency): void => {
      content = <Currency amount={currency.coins} scale={scaleCurrency} />;
    },
    visitPack: (pack: IPack): void => {
      content = <Pack pack={pack} scale={scalePack} />;
    },
  };

  item.accept(visitor);

  return content;
};

export default Item;
