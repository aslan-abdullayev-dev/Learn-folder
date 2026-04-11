import { Component, inject } from '@angular/core';
import { CubeComponent } from "./cube/cube.component";
import { CubeService } from "./cube/cube.service";
import { NgStyle } from "@angular/common";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faGear
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from "../app.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'ttd-header',
  standalone: true,
  imports: [
    CubeComponent,
    NgStyle,
    FontAwesomeModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cubeService = inject(CubeService);
  appService = inject(AppService);
  faGear = faGear;
  cube1Rotation = ""
  cube2Rotation = ""
  showSettingsPopup = false;

  handleClickRolDice = () => {
    this.cube1Rotation = this.cubeService.rollTheDice().CSSRotation
    this.cube2Rotation = this.cubeService.rollTheDice().CSSRotation
  }

  toggleSettingsPopup() {
    this.showSettingsPopup = !this.showSettingsPopup;
  }

  get player1Points() {
    return this.appService.gameState.player1Points
  }

  get player2Points() {
    return this.appService.gameState.player2Points
  }
}
