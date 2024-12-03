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
import { toast } from "react-toastify";

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
        battleClient?.setBattleStateObserver(battleStateObserver);
        battleClient?.onStopped(() => {
          navigate("/home");
        })
    };
    setObserver();
  }, [battleClient]);

  class MatchObserver implements IMatchStateObserver {
    gameFound(opponent: string): void {
      console.log("Game found against " + opponent);
      navigate("/battle");
    }
    matchEnded(type: string): void {
      console.log("Match Ended");
      navigate("/home");
    }
  }

  const startmatch = async () => {
    if(!selectedDropdownOption) {
      toast.error("You need to select a deck", {
        toastId: "needADeck",
      });
      return
    }
    if(!((await selectedDropdownOption.value.getValidity()).isValid)) {
      toast.error("Selected deck must be valid", {
        toastId: "invalidDeck",
      });
      return;
    }
    if (battleClient) {
      battleClient.matchController.match("pvp", selectedDropdownOption.value);

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
        noSelectionLabel="Select a deck"
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
