import { Component, inject } from '@angular/core';
import { CubeComponent } from "./cube/cube.component";
import { CubeService } from "./cube/cube.service";
import { NgStyle } from "@angular/common";

@Component({
  selector: 'ttd-header',
  standalone: true,
  imports: [
    CubeComponent,
    NgStyle,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  styleObj: Partial<CSSStyleDeclaration> = {
    backgroundColor: 1 > 0 ? 'red' : "blue",
    border: "10px solid blue",
  }
  cubeService = inject(CubeService)
  cube1Rotation = ""
  cube2Rotation = ""

  handleClickRolDice = () => {
    this.cube1Rotation = this.cubeService.rollTheDice().CSSRotation
    this.cube2Rotation = this.cubeService.rollTheDice().CSSRotation
  }
}
