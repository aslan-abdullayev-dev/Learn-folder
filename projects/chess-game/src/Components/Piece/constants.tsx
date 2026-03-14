import {
  BishopBlack,
  BishopWhite,
  KingBlack,
  KingWhite,
  KnightBlack,
  KnightWhite,
  PawnBlack,
  PawnWhite,
  QueenBlack,
  QueenWhite,
  RookBlack,
  RookWhite
} from "../../Assets/Images/Pieces";

import type { PieceNameType } from "./types";

export const pieceImageMap: Record<PieceNameType, string> = {
  "king-black": KingBlack,
  "king-white": KingWhite,
  "queen-black": QueenBlack,
  "queen-white": QueenWhite,
  "bishop-black": BishopBlack,
  "bishop-white": BishopWhite,
  "knight-black": KnightBlack,
  "knight-white": KnightWhite,
  "rook-black": RookBlack,
  "rook-white": RookWhite,
  "pawn-black": PawnBlack,
  "pawn-white": PawnWhite,
};
