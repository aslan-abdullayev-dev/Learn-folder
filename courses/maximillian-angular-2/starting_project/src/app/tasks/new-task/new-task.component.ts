import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TaskService } from "../tasks.service";

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  @Input({required: true}) userId!: string;
  @Output() close = new EventEmitter<void>()

  enteredTitle = ""
  enteredSummary = ""
  enteredDate = ""

  constructor(private taskService: TaskService) {
  }


  onCancel() {
    this.close.emit()
  }

  onSubmit() {
    this.taskService.addTask(
      {
        date: this.enteredDate,
        summary: this.enteredSummary,
        title: this.enteredTitle,
      },
      this.userId
    )
    this.close.emit()
  }
}
