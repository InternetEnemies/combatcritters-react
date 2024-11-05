/**
 * @Created 2024-10-07
 * @Brief Hook for managing the pack opening logic.
 */

import { IUserPack } from "combatcritters-ts";
import { useState } from "react";
import { ICard } from "combatcritters-ts";
import { ClientSingleton } from "ClientSingleton";

export const usePackRewards = (
  setIsSidebarVisible: (isVisible: boolean) => void, //Close the sidebar when the rewards popup appears
  fetchAndSetPacks: () => void //Update the packs when a pack is opened
) => {
  const [rewards, setRewards] = useState<ICard[]>([]);
  const [isPackRewardsVisible, setIsPackRewardsVisible] =
    useState<boolean>(false);

  //This is called when the open pack button in the PackSidebar component is clicked
  const openPack = async (pack: IUserPack) => {
    try {
      const openedRewards = await pack.open();
      setRewards(openedRewards);
      setIsPackRewardsVisible(true);
      setIsSidebarVisible(false);
      const packs = await ClientSingleton.getInstance().user.packs.getPacks();
      fetchAndSetPacks();
    } catch (error) {
      console.log("Error opening pack:" + error);
      setRewards([]);
    }
  };


  return {
    rewards,
    isPackRewardsVisible,
    setIsPackRewardsVisible,
    openPack,
  };
};
