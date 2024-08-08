import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRotateBackward,
  faRotateForward,
  faFlagCheckered,
  faX,
  faO,
  faEraser
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'ttd-control-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent {
  faRotateBackward = faRotateBackward;
  faRotateForward = faRotateForward;
  faFlagCheckered = faFlagCheckered;
  faX = faX;
  faO = faO;
  faEraser = faEraser;
}
