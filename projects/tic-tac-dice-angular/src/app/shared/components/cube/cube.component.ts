import { Component, HostBinding } from '@angular/core';
import { NgStyle } from "@angular/common";

@Component({
  selector: 'ttd-cube',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './cube.component.html',
  styleUrl: './cube.component.scss'
})
export class CubeComponent {
  @HostBinding('style.--cube-size') cubeSize = '40px';
  @HostBinding('style.--dote-size') dotSize = '5px';

  min = 1;
  max = 24;

  webkitTransform = "rotateX(45deg) rotateY(45deg)"
  transform = "rotateX(45deg) rotateY(45deg)"

  onclick() {
    const xRand = this.getRandom(this.max, this.min);
    const yRand = this.getRandom(this.max, this.min);

    this.webkitTransform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
    this.transform = 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)';
  }

  getRandom(max: number, min: number) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
  }

}
