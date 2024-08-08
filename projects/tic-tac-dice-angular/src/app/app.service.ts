import { Injectable } from "@angular/core";
import { IAppService, IGameSettings, ITile } from "./app.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  playerTurn: 1 | 2 | null = null;
  gameHasStarted: boolean = false;
  gameFinished: boolean = false;
  winner: 1 | 2 | null = null;
  player1Points = 6;
  player2Points = 19;
  gameSettings: IGameSettings = {
    tileSize: "4",
    canDelete: true,
    canDoubleMove: true,
    canUndoRedo: true,
  }
  prevStates: IAppService[] = [];

  get tiles(): ITile[] {
    const newTiles: ITile[] = [];
    for (let i = 0; i < Number(this.gameSettings.tileSize); i++) {
      for (let j = 0; j < Number(this.gameSettings.tileSize); j++) {
        const newTile: ITile = {
          id: `${i}-${j}`,
          ownedBy: 2 as 2,
        }
        newTiles.push(newTile)
      }
    }
    return newTiles;
  }

}
