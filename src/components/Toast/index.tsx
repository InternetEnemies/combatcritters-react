/**
 * @Created 2024-10-07
 * @Brief Toast popup component.
 */

import React from "react";
import "./toast.css";

interface ToastProps {
  show: boolean;
  setShow: (show: boolean) => void;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ show, setShow, message }) => {
  if (!show) {
    return null;
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="toast">
      <span>{message}</span>
      <button className="toastClose" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
