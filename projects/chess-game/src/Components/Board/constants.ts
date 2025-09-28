import { generateBoardTiles, placePiecesInitialPositions } from "./helpers";
import type { TileProps } from "../Tile/types";
import { pieceInitialPositionsMap } from "../Piece/constants";

const ROW_TILE_NAMES = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse();
const COL_TILE_NAMES = ["a", 'b', "c", "d", "e", "f", "g", "h"];

export const TILES: TileProps[][] = placePiecesInitialPositions(
  generateBoardTiles(
    ROW_TILE_NAMES,
    COL_TILE_NAMES
  ),
  pieceInitialPositionsMap
)
