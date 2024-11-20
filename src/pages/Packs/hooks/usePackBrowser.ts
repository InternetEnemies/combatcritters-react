/**
 * @Created 2024-10-07
 * @Brief Hook used to fetch the packs from the inventory and fetch their contents.
 */

import { ClientSingleton } from "ClientSingleton";
import { IUserPack } from "combatcritters-ts";
import { useState } from "react";
import { useEffect } from "react";

export const usePackBrowser = () => {
  const [packs, setPacks] = useState<IUserPack[]>([]);
  const [selectedPack, setSelectedPack] = useState<IUserPack | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  const fetchAndSetPacks = async () => {
    try {
      const fetchedPackStacks =
        await ClientSingleton.getInstance().user.packs.getPacks();
      const packList: IUserPack[] = [];
      fetchedPackStacks.forEach((packStack) => {
        for (let i = 0; i < packStack.getAmount(); i++) {
          packList.push(packStack.getItem());
        }
        setPacks(packList);
      });
    } catch (error) {
      console.error("Error fetching packs: ", error);
    }
  }
  /*
    On mount, fetch and set the user's packs.
  */
  useEffect(() => {
    fetchAndSetPacks();
  }, []);

  /*
    When a pack is clicked, display the pack set list on the PackSidebar.
  */
  useEffect(() => {
    if (selectedPack) {
      setIsSidebarVisible(true);
    } else {
      setIsSidebarVisible(false);
    }
  }, [selectedPack]);

  const handlePackClick = (pack: IUserPack) => {
    setSelectedPack(pack);
  };

  return {
    packs,
    selectedPack,
    setSelectedPack,
    isSidebarVisible,
    setIsSidebarVisible,
    handlePackClick,
    fetchAndSetPacks
  };
};
