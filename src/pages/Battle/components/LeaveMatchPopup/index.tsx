/**
 * @Created 2024-11-26
 * @Brief Leave match popup confirmation.
 */

import Button from "components/Button";
import "./leaveMatchPopup.css";
import { useBattleClient } from "contexts/BattleClientContext";

interface LeaveMatchPopupProps {
  setShowPopup: (show: boolean) => void;
}

const LeaveMatchPopup: React.FC<LeaveMatchPopupProps> = ({ setShowPopup }) => {
  const { battleClient } = useBattleClient();

  /**
   * Execute this function when the user confirms leave
   */
  const cancelMatch = () => {
    battleClient?.matchController.cancelMatch();
  };
  return (
    
    <div className="leaveMatchPopupRoot">
      <span>Are you sure you want to surrender?</span>
      <div className="confirmationButtonsContainer">
        <Button text="No" onClick={() => {setShowPopup(false)}} />
        <Button
          text="Yes"
          onClick={cancelMatch}
        />
      </div>
    </div>
  );
};

export default LeaveMatchPopup;
