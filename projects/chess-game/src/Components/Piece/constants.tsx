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
  "knight-black": KnightBlack,
  "knight-white": KnightWhite,

  "king-black": KingBlack,
  "king-white": KingWhite,

  "queen-black": QueenBlack,
  "queen-white": QueenWhite,

  "bishop-black": BishopBlack,
  "bishop-white": BishopWhite,

  "rook-black": RookBlack,
  "rook-white": RookWhite,

  "pawn-black": PawnBlack,
  "pawn-white": PawnWhite,
};

export const pieceInitialPositionsMap: Record<string, PieceNameType> = {
  "00": "rook-black",
  "01": "knight-black",
  "02": "bishop-black",
  "03": "queen-black",
  "04": "king-black",
  "05": "bishop-black",
  "06": "knight-black",
  "07": "rook-black",
  "10": "pawn-black",
  "11": "pawn-black",
  "12": "pawn-black",
  "13": "pawn-black",
  "14": "pawn-black",
  "15": "pawn-black",
  "16": "pawn-black",
  "17": "pawn-black",
  "60": "pawn-white",
  "61": "pawn-white",
  "62": "pawn-white",
  "63": "pawn-white",
  "64": "pawn-white",
  "65": "pawn-white",
  "66": "pawn-white",
  "67": "pawn-white",
  "70": "rook-white",
  "71": "knight-white",
  "72": "bishop-white",
  "73": "queen-white",
  "74": "king-white",
  "75": "bishop-white",
  "76": "knight-white",
  "77": "rook-white",
}