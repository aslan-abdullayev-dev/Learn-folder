import type { PieceNameType } from "../Piece/types";

export type BoardState = Record<string, PieceNameType | null>;
