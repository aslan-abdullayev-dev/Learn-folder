import { Injectable, signal } from "@angular/core";
import { TInvestmentResults } from "./investment-results.model";
import { TUserInput } from "../user-input/user-input.model";

@Injectable({
  providedIn: "root"
})
export class InvestmentResultsService {
  results = signal<TInvestmentResults[]>([])
  handleInvestmentInputs(data: TUserInput) {
    const {
      initialInvestment,
      annualInvestment,
      expectedReturn,
      duration
    } = data

    let investmentValue = initialInvestment;

    const annualData: TInvestmentResults[] = []
    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    this.results.set(annualData)
  }
}
