import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.css'
})
export class TrafficComponent {
  @Input({ required: true }) public dummyTrafficData!: { id: string, value: number }[];
  @Input({ required: true }) public maxTraffic!: number;
}
