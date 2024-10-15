/**
 * @Created 2024-10-07
 * @Brief Confirmation dialog popup.
 */

import React, { useEffect, useRef } from "react";
import "./confirmationDialog.css";
import Button from "components/Button";

interface ConfirmationDialogProps {
  show: boolean;
  message: string;
  onConfirm: () => void;  //Execute this callback when the user clicks confirm.
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
          <Button text="No" onClick={() => setShowDialog(false)} />
          <Button text="Yes" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
