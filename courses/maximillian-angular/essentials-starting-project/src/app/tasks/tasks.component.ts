import { Component, inject, Input } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { type TTask } from "./tasks.model";
import { type TUser } from "../user/user.model";
import { NewTaskComponent } from "./new-task/new-task.component";
import { TasksService } from "./tasks.service";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent,
    NewTaskComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input({ required: true }) user!: TUser;
  showNewTaskDialog: boolean = false;
  private tasksService = inject(TasksService);

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.user.id);
  }

  openNewTaskDialog() {
    this.showNewTaskDialog = true;
  }

  closeNewTaskDialog() {
    this.showNewTaskDialog = false;
  }
}
