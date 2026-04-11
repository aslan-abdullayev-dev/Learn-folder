import { Injectable } from "@angular/core";
import { IAppService, ITile } from "./app.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  gameState: IAppService = {
    playerTurn: null,
    gameHasStarted: false,
    gameFinished: false,
    winner: null,
    player1Points: 6,
    player2Points: 19,
    gameSettings: {
      tileSize: "4",
      canUndoRedo: true,
    },
    currentMoveType: null,
    prevStates: [],
    singleMoveState: {
      canStartMove: false,
      moveHasStarted: false,
      canFinishMove: false
    }
  }

  ngOnInit() {
    this.gameState.singleMoveState.canStartMove = this.canStartSingleMove;
    this.gameState.singleMoveState.canFinishMove = this.canFinishSingleMove;
  }

  get tiles(): ITile[] {
    const newTiles: ITile[] = [];
    for (let i = 0; i < Number(this.gameState.gameSettings.tileSize); i++) {
      for (let j = 0; j < Number(this.gameState.gameSettings.tileSize); j++) {
        const newTile: ITile = {
          id: `${i}-${j}`,
          ownedBy: 2 as 2,
        }
        newTiles.push(newTile)
      }
    }
    return newTiles;
  }

  startTheGame() {
    this.gameState.gameHasStarted = true;
  }

  onClickSingleMove() {
  }

  private get canStartSingleMove(): boolean {
    if (!this.gameState.gameHasStarted) return false;
    if (this.gameState.currentMoveType !== null) return false;

    return true;
  }

  private get canFinishSingleMove(): boolean {
    return true;
  }

  get canClickSingleMove() {
    return this.gameState.gameHasStarted
      && this.gameState.singleMoveState.canStartMove
      && this.gameState.singleMoveState.canFinishMove;
  }
}
