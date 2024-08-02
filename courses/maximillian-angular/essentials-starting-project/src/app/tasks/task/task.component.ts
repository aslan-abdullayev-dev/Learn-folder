import { Component, inject, Input } from '@angular/core';
import { TTask } from "../tasks.model";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({ required: true }) task!: TTask;
  private tasksService = inject(TasksService);

  completeTheTask() {
    this.tasksService.removeTask(this.task.id)
  }
}
