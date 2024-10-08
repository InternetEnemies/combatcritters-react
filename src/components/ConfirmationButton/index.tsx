/**
 * @Created 2024-10-07
 * @Brief Button that, when clicked, displays a confirmation dialog popup.
 */

import React, { useState } from "react";
import ConfirmationDialog from "components/ConfirmationDialog";
import "./confirmationButton.css";

interface ConfirmationButtonProps {
  onClick: () => void; //Callback to execute when the user confirms.
  confirmationMessage: string; //Confirmation message to display in the poopup.
  child: React.ReactElement; //Allow custom button components to be passed.
}

const ConfirmationButton: React.FC<ConfirmationButtonProps> = ({
  onClick,
  confirmationMessage,
  child,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowDialog(true);
  };

  const handleConfirm = () => {
    console.log("here");
    onClick();
    setShowDialog(false);
  };

  return (
    <>
      {React.cloneElement(child, {
        onClick: handleButtonClick,
        style: { cursor: "pointer", ...child.props.style }, 
      })}
      <ConfirmationDialog
        show={showDialog}
        setShowDialog={setShowDialog}
        message={confirmationMessage}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ConfirmationButton;
