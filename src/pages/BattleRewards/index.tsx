/**
 * @Created 2024-12-04
 * @Brief Battle rewards page.
 */

import Button from "components/Button";
import "./battleRewards.css";
import LevelBar from "pages/Vendors/components/LevelBar";
import {
  Currency,
  ICard,
  ICurrency,
  IItemStack,
  IPack,
  VendorReputation,
} from "combatcritters-ts";
import Pack from "components/Pack";
import { useEffect, useState } from "react";
import { ClientSingleton } from "ClientSingleton";
import CurrencyComp from "components/CurrencyComp";
import Card from "components/Card";
import { DEFAULT_CARD_WIDTH } from "components/Card";

const BattleRewards = () => {
  const [currencyGained, setCurrencyGained] = useState<ICurrency | null>(null);
  const [cardsGained, setCardsGained] = useState<IItemStack<ICard>[]>([]);
  const [packsGained, setPacksGained] = useState<IItemStack<IPack>[]>([]);

  const [currencyLost, setCurrencyLost] = useState<ICurrency | null>(null);
  const [cardsLost, setCardsLost] = useState<IItemStack<ICard>[]>([]);
  const [packsLost, setPacksLost] = useState<IItemStack<IPack>[]>([]);

  const itemsLost = () => {
    return !(
      currencyLost === null &&
      cardsLost.length === 0 &&
      packsLost.length === 0
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const builder = ClientSingleton.getInstance().user.cards.getBuilder();
      builder.setOwned(true);

      const cards = await ClientSingleton.getInstance().user.cards.getCards(
        builder.build()
      );
      const packs = await ClientSingleton.getInstance().user.packs.getPacks();
      const currency: ICurrency = new Currency(10);

      setPacksGained(packs);
      setCardsGained(cards);
      setCurrencyGained(currency);
    };

    fetchData();
  }, []);

  return (
    <div className="battleRewardsRoot">
      <span className="battleRewardsTitle">You Defeated Rob!</span>
      <div className="experienceGainedContainer">
        <span>12 Experience Gained!</span>
        <LevelBar vendorReputation={new VendorReputation(3, 2, 10, 1)} />{" "}
        {/*TODO Remove this */}
      </div>
      <div className="rewardsLostContainer">
        <div className="matchRewardsContainer">
          <span>Match Rewards</span>
          <hr className="separator" />
          <div>
            {currencyGained ? (
              <div
                className="rewardsLostCurrencyContainer"
                style={{ width: `${DEFAULT_CARD_WIDTH}px` }}
              >
                <CurrencyComp amount={currencyGained.coins} style={{color:"var(--custom-white)"}}/>
              </div>
            ) : (
              <></>
            )}
            {cardsGained.map((cardStack, index) => {
              return (
                <div>
                  <Card
                    card={cardStack.getItem()}
                    cardCount={cardStack.getAmount()}
                  />
                </div>
              );
            })}
            {packsGained.map((packStack, index) => {
              return (
                <Pack
                  pack={packStack.getItem()}
                  packCount={packStack.getAmount()}
                />
              );
            })}
          </div>
        </div>

        {false ? (
          <div className="lostItemsContainer">
            <span>Items Lost</span>
            <hr className="separator"/>
            <div></div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <Button text="Claim Victory" onClick={() => {}} />
    </div>
  );
};

export default BattleRewards;
