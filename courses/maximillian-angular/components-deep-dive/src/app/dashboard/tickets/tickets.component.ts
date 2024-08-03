import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  @Input({ required: true }) public dummyTrafficData!: { id: string, value: number }[];
  @Input({ required: true }) public maxTraffic!: number;
}
