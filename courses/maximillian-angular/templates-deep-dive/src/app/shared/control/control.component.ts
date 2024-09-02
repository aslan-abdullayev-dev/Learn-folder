import { AfterViewInit, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
  }
})
export class ControlComponent implements AfterViewInit {
  @Input({ required: true }) label!: string;

  constructor(private el: ElementRef<ControlComponent>) {
  }

  ngAfterViewInit() {
    console.log(this.el.nativeElement)
  }
}
