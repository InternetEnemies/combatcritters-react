import { useState } from "react";

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const triggerToast = (msg: string) => {
    setMessage(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return {
    showToast,
    message,
    triggerToast, 
    setShowToast,
  };
};
