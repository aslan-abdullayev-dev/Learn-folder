import { Component, Input } from '@angular/core';

import { ITask } from "./task.model";
import { TasksService } from "../tasks.service";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrl: './task.component.css'
})
export class TaskComponent {
    @Input({ required: true }) task!: ITask;

    constructor(private tasksService: TasksService) {
    }

    onCompleteTask() {
        this.tasksService.removeTask(this.task.id)
    }
}
