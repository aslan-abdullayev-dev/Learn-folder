import { Component, inject } from '@angular/core';
import { AppService } from "../app.service";

@Component({
  selector: 'ttd-board',
  standalone: true,
  imports: [],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  appService = inject(AppService);

  get tiles() {
    return this.appService.tiles;
  }
}
