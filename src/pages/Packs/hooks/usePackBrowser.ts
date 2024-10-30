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

  /*
    On mount, fetch the user's packs.
  */
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const fetchedPacks = await ClientSingleton.getInstance().user.packs.getPacks();
        setPacks(fetchedPacks.map((packStack) => {
          return packStack.getItem();
        }));
      } catch (error) {
        console.error("Error fetching packs: ", error);
      }
    };

    fetchPacks();
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
    setPacks,
    selectedPack,
    setSelectedPack,
    isSidebarVisible,
    setIsSidebarVisible,
    handlePackClick,
  };
};
