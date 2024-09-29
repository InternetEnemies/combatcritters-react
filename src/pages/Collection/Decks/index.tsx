import React from "react";
import { useDroppable } from "@dnd-kit/core";
import "./decks.css";
import { Deck } from "deck";
import { Card } from "card";


const Decks: React.FC<Deck> = ({ id, name, cards }) => {

  return (
    <div className="decksRoot">
    
    </div>
  );
};

export default Decks;
