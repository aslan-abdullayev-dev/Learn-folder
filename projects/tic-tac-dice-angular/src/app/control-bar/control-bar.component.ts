import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRotateBackward,
  faRotateForward,
  faFlagCheckered,
  faX,
  faO,
  faEraser
} from '@fortawesome/free-solid-svg-icons';
import { AppService } from "../app.service";

@Component({
  selector: 'ttd-control-bar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './control-bar.component.html',
  styleUrl: './control-bar.component.scss'
})
export class ControlBarComponent {
  appService = inject(AppService);
  faRotateBackward = faRotateBackward;
  faRotateForward = faRotateForward;
  faFlagCheckered = faFlagCheckered;
  faX = faX;
  faO = faO;
  faEraser = faEraser;

  get showUndoRedo() {
    return this.appService.gameState.gameSettings.canUndoRedo
  }

  get isDisabled() {
    return !this.appService.gameState.gameHasStarted
  }

  protected readonly JSON = JSON;
}
