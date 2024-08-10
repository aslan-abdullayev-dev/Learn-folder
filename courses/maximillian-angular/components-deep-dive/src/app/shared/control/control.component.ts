import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "control",
    "(click)": "console.log('hi')"
  }
})
export class ControlComponent {
  @Input({ required: true }) label!: string;
  protected readonly console = console;
}
