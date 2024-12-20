/**
 * @Created 2024-10-17
 * @Brief Packs page compnent.
 */

import "./packs.css";
import Pack from "components/Pack";
import PackSidebar from "./components/PackSidebar";
import { usePackBrowser } from "./hooks/usePackBrowser";
import PackRewards from "./components/PackRewards";
import { usePackRewards } from "./hooks/usePackRewards";

const Packs = () => {
  const {
    packs,
    selectedPack,
    setSelectedPack,
    isSidebarVisible,
    setIsSidebarVisible,
    handlePackClick,
    fetchAndSetPacks
  } = usePackBrowser();

  const {
    rewards,
    isPackRewardsVisible,
    setIsPackRewardsVisible,
    openPack,
  } = usePackRewards(setIsSidebarVisible, fetchAndSetPacks);

  return (
    <div className="packsRoot">
      <div className="packsGrid">
        {packs.map((pack, index) => (
          <Pack
            pack={pack}
            onClick={() => handlePackClick(pack)}
            style={{ cursor: "pointer" }}
            key={index}
            scale={1.4}
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
      <PackRewards rewards={rewards} isVisible={isPackRewardsVisible} setIsVisible={setIsPackRewardsVisible}/>
    </div>
  );
};

export default Packs;
