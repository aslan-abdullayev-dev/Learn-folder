import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { InvestmentInput } from "../app.model";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Output() calculate = new EventEmitter<InvestmentInput>();
  enteredInitialInvestment = "0"
  enteredAnnualInvestment = "0"
  enteredExpectedReturn = "5"
  enteredDuration = "10"

  onSubmit() {
    this.calculate.emit({
      duration: Number(this.enteredDuration),
      annualInvestment: Number(this.enteredAnnualInvestment),
      initialInvestment: Number(this.enteredInitialInvestment),
      expectedReturn: Number(this.enteredExpectedReturn)
    });
  }
}
