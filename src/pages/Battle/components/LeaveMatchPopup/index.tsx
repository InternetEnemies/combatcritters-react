/**
 * @Created 2024-11-26
 * @Brief Leave match popup confirmation.
 */

import Button from "components/Button";
import "./leaveMatchPopup.css";
import { useBattleClient } from "contexts/BattleClientContext";
import { useNavigate } from "react-router-dom";

interface LeaveMatchPopupProps {
  setShowPopup: (show: boolean) => void;
}

const LeaveMatchPopup: React.FC<LeaveMatchPopupProps> = ({ setShowPopup }) => {
  const { battleClient } = useBattleClient();
  const navigate = useNavigate();
  const leaveMatch = () => {
    battleClient?.matchController.cancelMatch();
     navigate("/home");
  };
  return (
    
    <div className="leaveMatchPopupRoot">
      <span>Are you sure you want to abandon the match?</span>
      <div className="confirmationButtonsContainer">
        <Button text="No" onClick={() => {setShowPopup(false)}} />
        <Button
          text="Yes"
          onClick={leaveMatch}
        />
      </div>
    </div>
  );
};

export default LeaveMatchPopup;
