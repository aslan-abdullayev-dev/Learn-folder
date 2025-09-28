import type { PieceNameType } from "../Piece/types";

export type TileColor = "DARK" | "LIGHT";

export interface TileProps {
  name: string
  piece: null | PieceNameType
  row: string
  col: string
  rowIdx: number
  colIdx: number
  color: TileColor
}