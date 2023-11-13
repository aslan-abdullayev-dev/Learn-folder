import "./Board.scss"

import React from "react";

import { boardTiles } from "../../constants/boardTiles";

function Board() {
  return (
    <div className="board">
      {boardTiles.map((boardRow) => (
        <div className="boardRow">
          {boardRow.map((cell) => {
            return <div className="boardCell">cell {cell}</div>;
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
