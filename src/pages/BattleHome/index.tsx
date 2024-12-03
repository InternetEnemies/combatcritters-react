/**
 * @Created 2024-10-07
 * @Brief The home screen that lets users search for battles.
 */

import React, { useEffect, useState } from "react";
import "./battleHome.css";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import { IDropdownOption } from "interfaces/IDropdownOption";
import {
  IBattleStateObserver,
  ICard,
  ICardState,
  IDeck,
  IMatchStateObserver,
} from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";
import { useBattleClient } from "contexts/BattleClientContext";
import { useBattleState } from "contexts/BattleStateContext";
import { useNavigate } from "react-router-dom";
import Loading from "./components/Loading";

const BattleHome: React.FC = () => {
  const navigate = useNavigate();
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [deckDropdownOptions, setDeckDropdownOptions] = useState<
    IDropdownOption<IDeck>[]
  >([]);
  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState<IDropdownOption<IDeck> | null>(null);
  const { battleClient, refreshClient } = useBattleClient();

  const { battleStateObserver } = useBattleState();

  useEffect(() => {
    ClientSingleton.getInstance().user.decks.validator.refresh();
    const fetchDecks = async () => {
      try {
        const fetchedDecks =
          await ClientSingleton.getInstance().user.decks.getDecks();

        const options = fetchedDecks.map((deck) => ({
          label: deck.name,
          value: deck,
        }));
        setDeckDropdownOptions(options);
      } catch (error) {
        console.error("Error fetching decks:", error);
      }
    };
    refreshClient();
    fetchDecks();
  }, []);

  useEffect(() => {
    const setObserver = async () => {
      if (battleClient) {
        battleClient.setBattleStateObserver(battleStateObserver);
        console.log("herre");
      }
    };
    setObserver();
  }, [battleClient]);

  class MatchObserver implements IMatchStateObserver {
    gameFound(opponent: string): void {
      console.log("Game found against opponent");
      navigate("/battle");
    }
    matchEnded(type: string): void {
      console.log("Match Ended");
      navigate("/home");
    }
  }

  let battleObsv: IBattleStateObserver = {
    setPlayerTurn: function (isPlayerTurn: boolean): void {
      throw new Error("Function not implemented.");
    },
    setPlayerHealth: function (health: number): void {
      throw new Error("Function not implemented.");
    },
    setEnemyHealth: function (health: number): void {
      throw new Error("Function not implemented.");
    },
    setPlayerEnergy: function (energy: number): void {
      throw new Error("Function not implemented.");
    },
    setEnemyEnergy: function (energy: number): void {
      throw new Error("Function not implemented.");
    },
    setHand: function (cards: ICard[]): void {
      throw new Error("Function not implemented.");
    },
    setDrawPileSize: function (size: number): void {
      throw new Error("Function not implemented.");
    },
    setPlayerBufferCards: function (cardStates: (ICardState | null)[]): void {
      throw new Error("Function not implemented.");
    },
    setEnemyBufferCards: function (cardStates: (ICardState | null)[]): void {
      throw new Error("Function not implemented.");
    },
    setEnemyCards: function (cardStates: (ICardState | null)[]): void {
      throw new Error("Function not implemented.");
    },
    setPlayerCards: function (cardStates: (ICardState | null)[]): void {
      throw new Error("Function not implemented.");
    },
  };

  const startmatch = async () => {
    if (battleClient) {
      battleClient.matchController.match("pvp");

      battleClient.setMatchStateObserver(new MatchObserver());
      setShowLoading(true);
    }
    console.log(battleClient);
    // refreshClient();
  };

  return (
    <div className="battleHomeRoot">
      <Dropdown
        dropdownOptions={deckDropdownOptions}
        selectedDropdownOption={selectedDropdownOption}
        setSelectedDropdownOption={setSelectedDropdownOption}
      />
      <div className="battleButtonWrapper">
        <Button
          text="Battle"
          onClick={startmatch}
          className="battleButton"
        ></Button>
      </div>
      <Loading showLoading={showLoading} setShowLoading={setShowLoading}/>
    </div>
  );
};

export default BattleHome;
