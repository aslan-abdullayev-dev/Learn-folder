import { Component, signal, output } from '@angular/core';
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
  onCalculate = output<TUserInput>();
  initialInvestment = signal("1000");
  annualInvestment = signal("200");
  expectedReturn = signal("5");
  duration = signal("10");

  handleCalculate() {
    this.onCalculate.emit({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration(),
    });
    this.initialInvestment.set("0")
    this.annualInvestment.set("0")
    this.expectedReturn.set("0")
    this.duration.set("0")
  }
}
