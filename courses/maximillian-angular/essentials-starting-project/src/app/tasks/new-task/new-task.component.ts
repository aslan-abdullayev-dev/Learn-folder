import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { type TNewTask } from "../tasks.model";

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
  @Output() close = new EventEmitter<void>();
  @Output() add = new EventEmitter<TNewTask>();

  enteredTitle = ""
  enteredSummary = ""
  enteredDueDate = ""

  onClose() {
    this.close.emit();
  }

  handleFormSubmit() {
    this.add.emit({
      title: this.enteredTitle,
      summary: this.enteredSummary,
      dueDate: this.enteredDueDate,
    })
    this.enteredTitle = ""
    this.enteredSummary = ""
    this.enteredDueDate = ""
    this.close.emit()
  }
}
