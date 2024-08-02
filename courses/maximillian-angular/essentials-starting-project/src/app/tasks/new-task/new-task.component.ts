import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TTask } from "../tasks.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: TTask["userId"];
  @Output() close = new EventEmitter<void>();

  enteredTitle = ""
  enteredSummary = ""
  enteredDueDate = ""
  private tasksService = inject(TasksService);

  onClose() {
    this.close.emit();
  }

  handleFormSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle,
        summary: this.enteredSummary,
        dueDate: this.enteredDueDate,
      },
      this.userId
    )
    this.close.emit()
  }
}
