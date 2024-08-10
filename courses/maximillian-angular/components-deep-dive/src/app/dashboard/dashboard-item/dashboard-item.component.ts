import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  // encapsulation: ViewEncapsulation.None,
  // host: {
  //   class: "dashboard-item"
  // }
})
export class DashboardItemComponent {
  @Input({ required: true }) src!: string;
  @Input({ required: true }) alt!: string;
  @Input({ required: true }) title!: string;
}
