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
    setPacks,
    selectedPack,
    setSelectedPack,
    isSidebarVisible,
    setIsSidebarVisible,
    handlePackClick,
  } = usePackBrowser();

  const {
    rewards,
    isPackRewardsVisible,
    setIsPackRewardsVisible,
    openPack,
  } = usePackRewards(setIsSidebarVisible, setPacks);

  return (
    <div className="packsRoot">
      <div className="packsGrid">
        {packs.map((pack, index) => (
          <Pack
            pack={pack}
            onClick={handlePackClick}
            style={{ cursor: "pointer" }}
            key={index}
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
