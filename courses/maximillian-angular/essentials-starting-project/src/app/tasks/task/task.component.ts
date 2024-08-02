import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TTask } from "../tasks.model";
import { CardComponent } from "../../shared/card/card.component";

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  imports: [
    CardComponent
  ],
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({ required: true }) task!: TTask;
  @Output() onTaskCompleted = new EventEmitter<TTask["id"]>();

  completeTheTask() {
    this.onTaskCompleted.emit(this.task.id);
  }
}
