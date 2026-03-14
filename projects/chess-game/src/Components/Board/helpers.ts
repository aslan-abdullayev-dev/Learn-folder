import type { TileColor, TileProps } from "../Tile/types";
import { COL_TILE_NAMES, ROW_TILE_NAMES } from "./constants";

export const generateBoardTiles = (): TileProps[][] => {
  return ROW_TILE_NAMES.map((row, rowIdx) =>
    COL_TILE_NAMES.map((col, colIdx) => {
      const color: TileColor = (rowIdx + colIdx) % 2 === 0 ? "LIGHT" : "DARK";
      return {name: `${col}${row}`, piece: null, row, col, rowIdx, colIdx, color};
    })
  );
};
