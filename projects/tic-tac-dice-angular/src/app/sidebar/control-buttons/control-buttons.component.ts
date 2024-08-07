import { Component, Input } from '@angular/core';
import { NgForOf, NgStyle } from "@angular/common";

@Component({
  selector: 'ttd-control-buttons',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './control-buttons.component.html',
  styleUrl: './control-buttons.component.scss'
})
export class ControlButtonsComponent {
  numberOfButtons = 3
  piesArr: { transformHold: number, transformPie: number, background: string }[] = []

  constructor() {
    this.generatePiesArr()
  }

  generatePiesArr() {
    for (let i = 0; i < this.numberOfButtons; i++) {
      this.piesArr.push({
        transformHold: i * 360 / this.numberOfButtons,
        transformPie: 360 / this.numberOfButtons,
        background: this.generateRandomColor()
      })
    }
  }

  generateRandomColor() {
    const generateHex = () => {
      const hex = Math.floor(Math.random() * 256).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + generateHex() + generateHex() + generateHex();
  }
}
