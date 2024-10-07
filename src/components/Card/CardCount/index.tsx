import "./cardCount.css";

interface CardCountProps {
  amount: number;
}

const CardCount: React.FC<CardCountProps> = ({ amount }) => {
  return (
    <div className="cardCount">
      <img
        className="cardsImage"
        alt="Card count"
        src="/assets/images/cardsTrio.svg"
      />
      <span>{amount}</span>
    </div>
  );
};

export default CardCount;
