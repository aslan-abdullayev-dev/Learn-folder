import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ttd-roll-dice-btn',
  standalone: true,
  imports: [],
  templateUrl: './roll-dice-btn.component.html',
  styleUrl: './roll-dice-btn.component.scss'
})
export class RollDiceBtnComponent {
  @Output() onRollTheDices = new EventEmitter<void>();

  handleRollTheDices() {
    this.onRollTheDices.emit()
  };
}
