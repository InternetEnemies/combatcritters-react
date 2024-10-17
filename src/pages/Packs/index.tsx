/**
 * @Created 2024-10-17
 * @Brief Packs page compnent.
 */

import React from "react";
import "./packs.css";
import Pack from "components/Pack";
import { IPack } from "combatcritters-ts";
import PackSidebar from "./components/PackSidebar";
import { usePackManager } from "./hooks/usePackManager";

const Packs = () => {
  const {
    packs,
    selectedPack,
    setSelectedPack,
    isSidebarVisible,
    setIsSidebarVisible,
    handlePackClick,
  } = usePackManager();

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
