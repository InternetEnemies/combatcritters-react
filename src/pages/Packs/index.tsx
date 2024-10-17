/**
 * @Created 2024-10-17
 * @Brief Packs page compnent.
 */

import React from "react";
import "./packs.css";
import Pack from "components/Pack";
import { IPack } from "combatcritters-ts";
import { useState } from "react";
import { PacksManager } from "TestWrapper/PacksManager";
import { useEffect } from "react";
import PackSidebar from "./components/PackSidebar";

const Packs = () => {
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

  const openPack = async (pack: IPack) => {
    try {
      return await pack.open();
    } catch (error) {
      console.log("Error opening pack:" + error);
      return [];
    }
  };

  return (
    <div className="packsRoot">
      <div className="packsGrid">
        {packs.map((pack, index) => (
          <Pack
            pack={pack}
            onClick={handlePackClick}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
      <PackSidebar
        pack={selectedPack}
        setPack={setSelectedPack}
        openPack={openPack}
        isVisible={isSidebarVisible}
        setIsVisible={setIsSidebarVisible}
      />
    </div>
  );
};

export default Packs;
