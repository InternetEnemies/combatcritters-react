/**
 * @Created 2024-11-25
 * @Brief Animated loading component.
 */

import "./loadingCards.css";

const LoadingCards = ({}) => {
  return (
    <div className="loadingCardsRoot">
      <img className="loadingCard" src="/assets/images/playingCard.svg" />
      <img className="loadingCard" src="/assets/images/playingCard.svg" />
      <img className="loadingCard" src="/assets/images/playingCard.svg" />
    </div>
  );
};

export default LoadingCards;