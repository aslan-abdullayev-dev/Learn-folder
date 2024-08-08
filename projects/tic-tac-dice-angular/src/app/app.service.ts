import { Injectable } from "@angular/core";
import { IAppService, ITile } from "./app.model";

@Injectable({
  providedIn: 'root'
})
export class AppService implements IAppService {
  gameHasStarted = false;
  playerTurn = null;
  gameFinished = false;
  player1Points = 0;
  player2Points = 0;
  winner = null;
  prevStates = [];
  gameSettings = {
    tileSize: 4 as 4,
    canDelete: true,
    canDoubleMove: true,
    canUndoRedo: true,
  }

  get tiles(): ITile[] {
    const newTiles: ITile[] = [];
    for (let i = 0; i < this.gameSettings.tileSize; i++) {
      for (let j = 0; j < this.gameSettings.tileSize; j++) {
        const newTile = {
          id: `${i}-${j}`,
          ownedBy: null,
          isEmpty: true
        }
        newTiles.push(newTile)
      }
    }
    return newTiles;
  }

}
