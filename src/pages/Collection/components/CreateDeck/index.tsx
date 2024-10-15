/**
 * @Created 2024-10-07
 * @Brief Popover that occurs when a user clicks the create deck button.
 */

import React, { useState, useEffect, useRef } from "react";
import "./createDeck.css";
import Button from "components/Button";
import Toast from "components/Toast";
import { useToast } from "hooks/useToast";

interface CreateDeckProps {
  onCreateDeck: (deckName: string) => void; //Callback function for when the user creates their deck.
}

const CreateDeck: React.FC<CreateDeckProps> = ({ onCreateDeck }) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [deckName, setDeckName] = useState("");
  const { showToast, toastMessage, triggerToast, setShowToast } = useToast();
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleTogglePopover = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  //Close the popover if the user clicks outside of it.
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

    setDeckName("");
    setPopoverOpen(false);
  };

  return (
    <div className="createDeckRoot">
      <span className="createDeckButton" onClick={handleTogglePopover}>+</span>

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
          />
        </div>
      )}

      <Toast show={showToast} setShow={setShowToast} message={toastMessage} />
    </div>
  );
};

export default CreateDeck;
