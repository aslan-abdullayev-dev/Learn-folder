import { Component, ElementRef, inject, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    "[class.control]": "addControlClass",
    // "(click)":"onClick()"
  }
})
export class ControlComponent {
  @Input({ required: true }) label!: string;
  private el = inject(ElementRef)

  get addControlClass() {
    return true
  }
  // onClick() {
  //   console.dir(this.el)
  // }
}
