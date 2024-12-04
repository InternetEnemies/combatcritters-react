/**
 * @Created 2024-11-25
 * @Brief Loading icon component.
 */
import { useBattleClient } from "contexts/BattleClientContext";
import "./loading.css";
import React from "react";
import Button from "components/Button";

interface LoadingProps {
  showLoading: boolean;
  setShowLoading: (show: boolean) => void;
}

const Loading: React.FC<LoadingProps> = ({ showLoading, setShowLoading }) => {
  const { battleClient, fetchBattleClient } = useBattleClient();

  if (!showLoading) {
    return null;
  }

  const cancelSearch = () => {
    battleClient?.matchController.cancelMatch();
    fetchBattleClient();
    setShowLoading(false);
  };

  return (
    <div className="loadingRoot">
      <div className="loadingIconContainer">
        <span>Searching for an opponent...</span>
        <div className="loadingIcon"></div>
        <Button text={"Cancel"} onClick={cancelSearch} />
      </div>
    </div>
  );
};

export default Loading;
