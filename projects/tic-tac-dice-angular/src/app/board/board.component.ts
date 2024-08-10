import { Component, HostBinding, inject } from '@angular/core';
import { AppService } from "../app.service";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'ttd-board',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  private appService = inject(AppService);

  get tiles() {
    return this.appService.tiles;
  }

  get tileSize() {
    return Number(this.appService.gameState.gameSettings.tileSize)
  }
}
