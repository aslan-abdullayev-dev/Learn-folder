export interface IAppService {
  playerTurn: 1 | 2 | null;
  gameHasStarted: boolean;
  gameFinished: boolean;
  winner: 1 | 2 | null;
  player1Points: number;
  player2Points: number;
  gameSettings: IGameSettings;
  prevStates: Omit<IAppService, "prevStates">[];
  currentMoveType: "single" | "combo" | "delete" | null;
  singleMoveState: ISingleMoveState;
}

export interface IGameSettings {
  tileSize: "3" | "4";
  canUndoRedo: boolean;
}

export interface ITile {
  ownedBy: 1 | 2 | null;
  id: string;
}

interface ISingleMoveState {
  moveHasStarted: boolean;
  canStartMove: boolean;
  canFinishMove: boolean;
}
