import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  @Input({ required: true }) size!: { width: string; height: string };

  onReset() {
    // ...
  }
}
