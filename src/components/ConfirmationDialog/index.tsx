import React, { useEffect, useRef } from "react";
import "./confirmationDialog.css";

interface ConfirmationDialogProps {
  show: boolean;
  message: string; 
  onConfirm: () => void; 
  setShowDialog: (show: boolean) => void; 
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  show,
  message,
  onConfirm,
  setShowDialog,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setShowDialog(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, setShowDialog]);

  if (!show) {
    return null; 
  }

  return (
    <div className="confirmationDialogOverlay">
      <div className="confirmationDialog" ref={dialogRef}>
        <p>{message}</p>
        <div className="confirmationDialogButtons">
          <button className="cancelButton" onClick={() => setShowDialog(false)}>
            Cancel
          </button>
          <button className="confirmButton" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;