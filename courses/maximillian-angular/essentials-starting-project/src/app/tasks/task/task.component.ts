import { Component, inject, Input } from '@angular/core';
import { TTask } from "../tasks.model";
import { CardComponent } from "../../shared/card/card.component";
import { DatePipe } from "@angular/common";
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  imports: [
    CardComponent,
    DatePipe
  ],
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input({ required: true }) task!: TTask;
  private tasksService = inject(TasksService);

  completeTheTask() {
    this.tasksService.removeTask(this.task.id)
  }
}
