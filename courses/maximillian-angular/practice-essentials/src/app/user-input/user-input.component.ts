import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TUserInput } from "./user-input.model";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Output() onCalculate = new EventEmitter<TUserInput>();

  initialInvestment = "1000";
  annualInvestment = "200";
  expectedReturn = "5";
  duration = "10";

  handleCalculate() {
    this.onCalculate.emit({
      initialInvestment: +this.initialInvestment,
      annualInvestment: +this.annualInvestment,
      expectedReturn: +this.expectedReturn,
      duration: +this.duration,
    });
  }
}
