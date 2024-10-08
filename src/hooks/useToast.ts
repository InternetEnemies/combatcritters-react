/**
 * @Created 2024-10-07
 * @Brief Hook used to display toast messages.
 */

import { useState } from "react";

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setMessage] = useState("");

  const triggerToast = (msg: string) => {
    setMessage(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return {
    showToast,
    toastMessage,
    triggerToast,
    setShowToast,
  };
};
