import React from "react";
import { ICardCritter, ICardItem, ICurrency, IItem, IItemVisitor, IOffer, IPack } from "combatcritters-ts/src/objects";
import "./hpDmgFooter.css";
import Card from "components/Card";
import Pack from "components/Pack";

interface OfferProps {
    offer: IOffer;
}

const Offer: React.FC<OfferProps> = ({ offer }) => {
  let content: React.ReactNode = null;

  const visitor: IItemVisitor = {
    visitCritter: (critter: ICardCritter): void => {
      content = (
        <Card card={critter}/>
      );
    },
    visitItem: (item: ICardItem): void => {
      content = (
        <Card card={item}/>
      )
    },
    visitCurrency: (currency: ICurrency): void => {
        content = (
            <div></div> //TODO
        )
    },
    visitPack: (pack: IPack): void => {
        content = (
            <Pack pack={pack}/>
        )
    }
  };

  offer.receiveItem.getItem().accept(visitor);

  return content;
};

export default Offer;
