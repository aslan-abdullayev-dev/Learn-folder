import { Component, input } from '@angular/core';
import { TInvestmentResults } from "./investment-results.model";
import { CurrencyPipe } from "@angular/common";

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  results = input<TInvestmentResults[] | undefined>(undefined)
}
