import "./styles.scss"

import { pieceImageMap } from "./constants";
import type { TileProps } from "../Tile/types";

type PieceProps = {
  piece: TileProps["piece"]
}

const Piece = ({piece}: PieceProps) => {
  return (
    <div>
      {piece && <img
        className="piece"
        src={pieceImageMap[piece]}
        alt={piece}
      />}
    </div>
  )
}

export default Piece