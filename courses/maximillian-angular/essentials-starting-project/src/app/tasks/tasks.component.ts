import { Component, Input } from '@angular/core';
import { TUser } from "../dummy-users";
import { TaskComponent } from "./task/task.component";

export type TTask = {
  id: string
  userId: string
  title: string
  summary: string
  dueDate: string
}

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [
    TaskComponent
  ],
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  @Input() user?: TUser;
  tasks: TTask[] = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basic and advanced features of Angular & how to apply them.',
      dueDate: '2025-12-31',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build first prototype',
      summary: 'Build a first prototype of the online shop website',
      dueDate: '2024-05-31',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template',
      summary:
        'Prepare and describe an issue template which will help with project management',
      dueDate: '2024-06-15',
    },
  ]
  get getUserTasks() {
    return this.tasks.filter(t => t.userId === this.user?.id)
  }
}
