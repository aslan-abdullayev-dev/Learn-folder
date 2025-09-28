import type { TileProps } from "../Tile/types";
import type { PieceNameType } from "../Piece/types.ts";

export const generateBoardTiles = (
  rowTiles: string[],
  colTiles: string[]
): TileProps[][] => {
  return rowTiles.map((row, rowIdx) =>
    colTiles.map((col, colIdx) => {
      const isLight = (rowIdx + colIdx) % 2 === 0
      const tile: TileProps = {
        name: `${row}${col}`,
        piece: null,
        row,
        col,
        rowIdx,
        colIdx,
        color: isLight ? "LIGHT" : "DARK"
      }
      return tile
    })
  )
}

export const placePiecesInitialPositions = (
  board: TileProps[][],
  pieceInitialPositionsMap: Record<string, PieceNameType>
): TileProps[][] => {
  Object.entries(pieceInitialPositionsMap).forEach(([position, pieceName]) => {
    const [x, y] = position.split("");
    board[Number(x)][Number(y)].piece = pieceName
  })
  return board
}