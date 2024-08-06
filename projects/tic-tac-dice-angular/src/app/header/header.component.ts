import { Component, inject } from '@angular/core';
import { CubeComponent } from "../shared/components/cube/cube.component";
import { RollDiceBtnComponent } from "../roll-dice-btn/roll-dice-btn.component";
import { CubeService } from "../shared/components/cube/cube.service";

@Component({
  selector: 'ttd-header',
  standalone: true,
  imports: [
    CubeComponent,
    RollDiceBtnComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cubeService = inject(CubeService)
  cube1Rotation = ""
  cube2Rotation = ""

  handleClickRolDice = () => {
    this.cube1Rotation = this.cubeService.rollTheDice().CSSRotation
    this.cube2Rotation = this.cubeService.rollTheDice().CSSRotation


    // console.log(
    //   this.cubeService.rollTheDice()
    // )
  }

}
