/**
 * @Created 2024-10-07
 * @Brief Hook used to fetch the packs from the inventory.
 */

import { IPack } from "combatcritters-ts";
import { useState } from "react";
import { useEffect } from "react";
import { PacksManager } from "TestWrapper/PacksManager";

export const usePackManager = () => {
  const [packs, setPacks] = useState<IPack[]>([]);
  const [packsManager] = useState<PacksManager>(new PacksManager()); //TODO: remove this
  const [selectedPack, setSelectedPack] = useState<IPack | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  /*
    On mount, fetch the user's packs.
  */
  useEffect(() => {
    const fetchPacks = async () => {
      try {
        const fetchedPacks = await packsManager.getPacks(); //TODO: change this
        setPacks(fetchedPacks);
      } catch (error) {
        console.error("Error fetching packs: ", error);
      }
    };

    fetchPacks();
    //TODO: remove this once it is integrated
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handlePackClick = (pack: IPack) => {
    setSelectedPack(pack);
  };

  return {
    packs,
    selectedPack,
    setSelectedPack,
    isSidebarVisible,
    setIsSidebarVisible,
    handlePackClick,
  };
};
