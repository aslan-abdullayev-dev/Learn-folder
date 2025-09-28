import { useEffect, useState } from "react";
import Tile from "../Tile/Tile";
import { generateBoardTiles } from "./helpers";
import type { TileProps } from "../Tile/types";
import { initialBoardState } from "./constants";
import type { BoardState } from "./types";
import "./styles.scss";

const Board = () => {
  const [pieces, setPieces] = useState<BoardState>(initialBoardState);
  const boardTiles: TileProps[][] = generateBoardTiles();

  const movePiece = (from: string, to: string) => {
    setPieces(prev => {
      const stateCopy = structuredClone(prev);
      const selectedPiece = stateCopy[from];
      if (!selectedPiece) return prev;
      stateCopy[to] = selectedPiece;
      stateCopy[from] = null
      return stateCopy;
    });
  };

  useEffect(() => {
    movePiece("a1", "a3")
    movePiece("a3", "a4")
    movePiece("a4", "c4")
  }, [])

  return (
    <div className="board">
      {boardTiles.map(row => (
        <div className="board__row" key={row[0].rowIdx}>
          {row.map(tile => {
            const piece = pieces[tile.name] ?? null;
            return <Tile key={tile.name} tile={{...tile, piece}}/>;
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
