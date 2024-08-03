import { Component, signal, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { InvestmentResultsService } from "../investment-results/investment-results.service";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  private investmentResultsService = inject(InvestmentResultsService);

  initialInvestment = signal("1000");
  annualInvestment = signal("200");
  expectedReturn = signal("5");
  duration = signal("10");


  handleCalculate() {
    this.investmentResultsService.handleInvestmentInputs({
      initialInvestment: +this.initialInvestment(),
      annualInvestment: +this.annualInvestment(),
      expectedReturn: +this.expectedReturn(),
      duration: +this.duration(),
    })
    this.initialInvestment.set("0")
    this.annualInvestment.set("0")
    this.expectedReturn.set("0")
    this.duration.set("0")
  }
}
