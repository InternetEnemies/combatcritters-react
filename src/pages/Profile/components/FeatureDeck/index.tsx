import React from "react";
import { ICard } from "combatcritters-ts";
import Card from "components/Card";
import "./featureDeck.css";
import { useDeckProfileList } from "pages/Profile/hooks/useDeckProfileList";

const FeatureDeck: React.FC = () => {
  const { decks, featuredDeck, setFeaturedDeck, cards } = useDeckProfileList();

  return (
    <div className="deckContainer">
      <div className="deckListContainer">
        <h3 className="decksTitle">
          Feature a Deck
          <br /> on your Profile
        </h3>
        <ul className="deckList">
          {decks.map((deck) => (
            <li
              key={deck.deckid}
              className={`deckItem ${
                featuredDeck && featuredDeck.deckid === deck.deckid
                  ? "active"
                  : ""
              }`}
              onClick={() => setFeaturedDeck(deck)}
            >
              {deck.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="popupContainer">
        {featuredDeck ? (
          <div className="cardsGrid">
            {cards.length > 0 ? (
              cards.map((card: ICard) => <Card key={card.cardid} card={card} />)
            ) : (
              <p>No cards in this deck.</p>
            )}
          </div>
        ) : (
          <p>No deck currently featured.</p>
        )}
      </div>
    </div>
  );
};

export default FeatureDeck;
