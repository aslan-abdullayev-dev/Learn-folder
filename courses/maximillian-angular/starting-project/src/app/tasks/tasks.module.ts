import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { NewTaskComponent } from "./new-task/new-task.component";
import { TaskComponent } from "./task/task.component";
import { TasksComponent } from "./tasks.component";
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        TasksComponent,
        TaskComponent,
        NewTaskComponent,
    ],
    exports: [TasksComponent],
    imports: [SharedModule, FormsModule, CommonModule]
})
export class TasksModule {
}
