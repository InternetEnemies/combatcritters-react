/**
 * @Created 2024-10-07
 * @Brief General popup that is passed components to display as a popup.
 */

import React from "react";
import "./popup.css";

interface PopupProps {
  popupContent: React.ReactNode;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  onClose?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  popupContent,
  isVisible,
  setIsVisible,
  onClose = () => {},
}) => {
  if (!isVisible) return null; 

  const handleOverlayClick = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className="popupRoot" onClick={handleOverlayClick}>
      <div className="popupContentWrapper" onClick={(e) => e.stopPropagation()}>
        <span className="closePopupButton" onClick={handleOverlayClick}>
          &times;
        </span>

        {popupContent}
      </div>
    </div>
  );
};

export default Popup;
