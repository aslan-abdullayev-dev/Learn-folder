import { Component } from '@angular/core';
import { TScreenData } from "../calculatorTypes";

@Component({
  selector: 'app-calc-screen',
  standalone: true,
  templateUrl: './calc-screen.component.html',
  styleUrl: './calc-screen.component.sass'
})
export class CalcScreenComponent {
  operationsHistory: TScreenData = [
    {
      type: "number",
      value: 5
    },
    {
      type: "operator",
      value: "+"
    },
    {
      type: "number",
      value: 5
    },
  ];

  get result() {
    if (this.operationsHistory.length === 3) {
      switch (this.operationsHistory[1].value) {
        case "+": {
          return this.operationsHistory[0].value + this.operationsHistory[2].value;
        }
        case "-": {
          return this.operationsHistory[0].value - this.operationsHistory[2].value;
        }
        case "*": {
          return this.operationsHistory[0].value * this.operationsHistory[2].value;
        }
        case "/": {
          return this.operationsHistory[0].value / this.operationsHistory[2].value;
        }
      }
    }
    return 0;
  }
}
