import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "components/Card";
import { ISortableCard } from "interfaces/ISortableCard";

interface SortableCardProps {
  sortableCard: ISortableCard;
  translucent: boolean;
}

const SortableCard: React.FC<SortableCardProps> = ({
  sortableCard,
  translucent,
}) => {
  const { instanceId, card, cardCount } = sortableCard;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: instanceId,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
    opacity: isDragging ? (translucent ? 0.5 : 0) : 1,
    pointerEvents: isDragging ? "none" : "auto", 
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      tabIndex={0}
      style={style}
      className="sortableCard"
    >
      <Card card={card} cardCount={cardCount} />
    </div>
  );
};

export default SortableCard;
