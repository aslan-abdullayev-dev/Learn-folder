import { useState } from "react";
import Tile from "../Tile/Tile";
import { generateBoardTiles } from "./helpers";
import type { TileProps } from "../Tile/types";
import { initialBoardState } from "./constants";
import type { BoardState } from "./types";
import "./styles.scss";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

const Board = () => {
  const [pieces, setPieces] = useState<BoardState>(initialBoardState);
  const boardTiles: TileProps[][] = generateBoardTiles();

  const movePiece = (from: string, to: string) => {
    setPieces(prev => {
      const stateCopy = structuredClone(prev);
      const selectedPiece = stateCopy[from];
      if (!selectedPiece) return prev;
      stateCopy[to] = selectedPiece;
      stateCopy[from] = null;
      return stateCopy;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("event ==>", event);
    const {active, over} = event;
    if (over && active.id !== over.id) {
      movePiece(active.id as string, over.id as string);
    }
  };

  console.log("pieces ==>", pieces);

  return (
    <DndContext onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
};

export default Board;
