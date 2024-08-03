import { Component, inject } from '@angular/core';
import { InvestmentResultsService } from "./investment-results.service";

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentResultsService = inject(InvestmentResultsService);
  results = this.investmentResultsService.results
}
