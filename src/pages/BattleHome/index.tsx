/**
 * @Created 2024-10-07
 * @Brief The home screen that lets users search for battles.
 */

import React, { useEffect, useState } from "react";
import "./battleHome.css";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import { IDropdownOption } from "interfaces/IDropdownOption";
import { IDeck } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";
import { useBattleClient } from "contexts/BattleClientContext";
import Loading from "./components/Loading";
import { toast } from "react-toastify";

const BattleHome: React.FC = () => {
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const [deckDropdownOptions, setDeckDropdownOptions] = useState<
    IDropdownOption<IDeck>[]
  >([]);

  const [selectedDropdownOption, setSelectedDropdownOption] =
    useState<IDropdownOption<IDeck> | null>(null);

  const { battleClient, fetchBattleClient } = useBattleClient();

  /**
   * On mount, fetch and set the user's deck and fetch a new battle client.
   */
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
    fetchBattleClient();
    fetchDecks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startmatch = async () => {
    if (!selectedDropdownOption) {
      toast.error("You must select a deck", {
        toastId: "needADeck",
      });
      return;
    }

    if (!(await selectedDropdownOption.value.getValidity()).isValid) {
      toast.error("Selected deck must be valid", {
        toastId: "invalidDeck",
      });
      return;
    }

    battleClient?.matchController.match("pvp", selectedDropdownOption.value);

    setShowLoading(true);
  };

  return (
    <div className="battleHomeRoot">
      <div className="decksBattleButtonContainer">
        <Dropdown
          dropdownOptions={deckDropdownOptions}
          selectedDropdownOption={selectedDropdownOption}
          setSelectedDropdownOption={setSelectedDropdownOption}
          noSelectionLabel="Select a deck"
          style={{width: "100%"}}
        />
        <hr />
        <div className="battleButtonWrapper">
          <Button
            text="Battle"
            onClick={startmatch}
            className="battleButton"
          ></Button>
        </div>
      </div>

      <Loading showLoading={showLoading} setShowLoading={setShowLoading} />
    </div>
  );
};

export default BattleHome;
