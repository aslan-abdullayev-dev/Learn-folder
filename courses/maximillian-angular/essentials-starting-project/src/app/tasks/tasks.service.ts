import type { TNewTask, TTask } from "./tasks.model";
import { Injectable } from "@angular/core";
import { TUser } from "../user/user.model";

@Injectable({ providedIn: "root" })
export class TasksService {
  private tasks: TTask[] = [
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

  constructor() {
    const tasks = localStorage.getItem("tasks")
    if (tasks) {
      this.tasks = JSON.parse(tasks)
    }
  }

  getUserTasks(userId: TUser["id"]): TTask[] {
    return this.tasks.filter(t => t.userId === userId)
  }

  addTask(taskData: TNewTask, userId: TUser["id"]) {
    const newTask: TTask = {
      ...taskData,
      id: "" + Math.random() * 1_000_000,
      userId: userId,
    }
    this.tasks.unshift(newTask);
    this.saveTask()
  }

  removeTask(taskId: TTask["id"]) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    this.saveTask()
  }

  private saveTask() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
