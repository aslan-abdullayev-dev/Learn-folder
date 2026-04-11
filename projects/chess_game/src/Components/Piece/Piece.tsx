import type { PieceNameType } from "./types";
import { pieceImageMap } from "./constants";
import "./styles.scss";
import { useDraggable } from "@dnd-kit/core";

type PieceProps = { piece: PieceNameType | null, id: string };

const Piece = ({piece, id}: PieceProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });

  if (!piece) return null;

  const style = transform
    ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    }
    : undefined;

  return (
    <img
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="piece"
      src={pieceImageMap[piece]}
      alt={piece}
      style={style}
    />
  );
};

export default Piece;
