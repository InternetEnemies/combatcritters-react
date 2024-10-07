import React, { useState, useEffect, useRef } from "react";
import "./createDeck.css";
import Button from "components/Button";
import Toast from "components/Toast";
import { useToast } from "hooks/useToast";

interface CreateDeckProps {
  onCreateDeck: (deckName: string) => void; 
}

const CreateDeck: React.FC<CreateDeckProps> = ({ onCreateDeck }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [deckName, setDeckName] = useState("");
  const { showToast, toastMessage, triggerToast, setShowToast } = useToast(); 
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleTogglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false); 
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  const handleCreateDeck = () => {
    if (!deckName.trim()) {
      triggerToast("Deck name cannot be empty!");
      return;
    }

    onCreateDeck(deckName);
    console.log(`New deck created: ${deckName}`);

    setDeckName("");
    setPopoverOpen(false); 
  };

  return (
    <div className="createDeckRoot">
      <Button
        text="+"
        onClick={handleTogglePopover}
        className="createDeckButton"
      />

      {isPopoverOpen && (
        <div className="popover" ref={popoverRef}>
          <h3>Create New Deck</h3>
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            placeholder="Enter deck name"
          />
          <Button
            text="Create"
            onClick={handleCreateDeck} 
            className="createDeckButton"
          />
        </div>
      )}

      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </div>
  );
};

export default CreateDeck;
