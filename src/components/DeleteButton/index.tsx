/**
 * @Created 2024-10-07
 * @Brief Delete Deck button used in the deck builder.
 */

import React, { useState } from "react";
import ConfirmationDialog from "components/ConfirmationDialog";
import deleteIcon from "assets/icons/delete.svg";
import "./deleteButton.css";

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDialog(false);
  };

  return (
    <div className="deleteButtonContainer">
      <img
        src={deleteIcon}
        alt="Delete"
        className="deleteImage"
        onClick={handleDeleteClick}
      />

      <ConfirmationDialog
        show={showDialog}
        setShowDialog={setShowDialog}
        message="Are you sure you want to delete this deck?"
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default DeleteButton;
