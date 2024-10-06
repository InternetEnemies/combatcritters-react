import React, { useState } from "react";
import ConfirmationDialog from "components/ConfirmationDialog";

interface ConfirmationButtonProps {
  onClick: () => void;
  confirmationMessage: string; 
  child: React.ReactElement; 
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
    onClick();
    setShowDialog(false);
  };

  return (
    <>
      {React.cloneElement(child, { onClick: handleButtonClick })}

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
