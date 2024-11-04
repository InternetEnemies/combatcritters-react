/**
 * @Created 2024-10-07
 * @Brief General popup that is passed components to display as a popup.
 */

import React from "react";
import "./popup.css";

interface PopupProps {
  popupContent: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void; //Callback to set the popup visibility
  onClose?: () => void; //Optional callback to execute on close
}

const Popup: React.FC<PopupProps> = ({
  popupContent,
  isVisible,
  setIsVisible,
  onClose = () => {},
}) => {
  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className="popupRoot" onClick={handleClose}>
      <div className="popupContentWrapper" onClick={handleClose}>
        <span className="closePopupButton" onClick={handleClose}>
          &times;
        </span>
        <div onClick={(e) => e.stopPropagation()}>{popupContent}</div>
      </div>
    </div>
  );
};

export default Popup;
