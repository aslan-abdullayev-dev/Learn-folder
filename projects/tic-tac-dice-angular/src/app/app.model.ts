export interface IAppService {
  playerTurn: 1 | 2 | null;
  gameHasStarted: boolean;
  gameFinished: boolean;
  winner: 1 | 2 | null;
  player1Points: number;
  player2Points: number;
  gameSettings: IGameSettings;
  prevStates: IAppService[];
}

interface IGameSettings {
  tileSize: 3 | 4;
  canDelete: boolean;
  canDoubleMove: boolean;
  canUndoRedo: boolean;
}

export interface ITile {
  isEmpty: boolean;
  ownedBy: 1 | 2 | null;
  id: string;
}
