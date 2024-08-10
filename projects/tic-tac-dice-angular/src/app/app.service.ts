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
    prevStates: []
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
}
