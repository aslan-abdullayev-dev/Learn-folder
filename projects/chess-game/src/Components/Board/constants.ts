import type { BoardState } from "./types";

export const ROW_TILE_NAMES = ["8", "7", "6", "5", "4", "3", "2", "1"];
export const COL_TILE_NAMES = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const initialBoardState: BoardState = {
  "a8": "rook-black",
  "b8": "knight-black",
  "c8": "bishop-black",
  "d8": "queen-black",
  "e8": "king-black",
  "f8": "bishop-black",
  "g8": "knight-black",
  "h8": "rook-black",
  "a7": "pawn-black",
  "b7": "pawn-black",
  "c7": "pawn-black",
  "d7": "pawn-black",
  "e7": "pawn-black",
  "f7": "pawn-black",
  "g7": "pawn-black",
  "h7": "pawn-black",
  "a2": "pawn-white",
  "b2": "pawn-white",
  "c2": "pawn-white",
  "d2": "pawn-white",
  "e2": "pawn-white",
  "f2": "pawn-white",
  "g2": "pawn-white",
  "h2": "pawn-white",
  "a1": "rook-white",
  "b1": "knight-white",
  "c1": "bishop-white",
  "d1": "queen-white",
  "e1": "king-white",
  "f1": "bishop-white",
  "g1": "knight-white",
  "h1": "rook-white",
};
