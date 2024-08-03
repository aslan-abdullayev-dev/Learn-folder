import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TInvestmentData } from "./user-input.model";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Output() onCalculate = new EventEmitter<TInvestmentData>();

  initialInvestment = "0";
  annualInvestment = "0";
  expectedReturn = "0";
  duration = "0";

  handleCalculate() {
    this.onCalculate.emit({
      initialInvestment: Number(this.initialInvestment),
      annualInvestment: Number(this.initialInvestment),
      expectedReturn: Number(this.initialInvestment),
      duration: Number(this.initialInvestment),
    });
  }
}
