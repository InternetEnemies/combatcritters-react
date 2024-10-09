import React, { useState } from "react";
import NavBar from "components/NavBar";
import "./profile.css";

interface Deck {
  id: number;
  name: string;
}

const decks: Deck[] = [
  { id: 1, name: "Deck 1" },
  { id: 2, name: "Deck 2" },
  { id: 3, name: "Deck 3" },
];

const Profile: React.FC = () => {
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const handleDeckClick = (deck: Deck) => {
    setSelectedDeck(deck);
  };

  return (
    <div className="profileRoot">
      <NavBar />
      <div className="profileContainer">
        <div className="deckContainer">
          <div className="deckListContainer">
            <h3>Your Decks</h3>
            <ul className="deckList">
              {decks.map((deck) => (
                <li
                  key={deck.id}
                  className={`deckItem ${
                    selectedDeck?.id === deck.id ? "active" : ""
                  }`}
                  onClick={() => handleDeckClick(deck)}
                >
                  {deck.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="deckContentContainer">
            <h3>{selectedDeck ? selectedDeck.name : "Select a deck"}</h3>
            {selectedDeck && <p>Displaying cards for {selectedDeck.name}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
