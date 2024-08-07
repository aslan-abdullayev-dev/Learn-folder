import { Component, HostBinding, Input } from '@angular/core';
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
  @Input({ required: true }) CSSRotation!: string;
}
