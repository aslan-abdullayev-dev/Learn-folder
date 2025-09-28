import type { PieceNameType } from "./types";
import { pieceImageMap } from "./constants";
import "./styles.scss";

type PieceProps = { piece: PieceNameType | null };

const Piece = ({ piece }: PieceProps) => {
  if (!piece) return null;
  return <img className="piece" src={pieceImageMap[piece]} alt={piece} />;
};

export default Piece;
