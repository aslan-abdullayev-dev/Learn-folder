import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";
import { TasksComponent } from "./tasks/tasks.component";
import { TaskComponent } from "./tasks/task/task.component";
import { HeaderComponent } from "./header/header.component";
import { CardComponent } from "./shared/card/card.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserComponent,
        CardComponent, //* used inside UserComponent
        TasksComponent,
        TaskComponent, //* used inside TasksComponent
        NewTaskComponent //* used inside TasksComponent
    ], //* register all the components and directives
    bootstrap: [AppComponent], //* start application bootstrap from this component
    imports: [
        BrowserModule, //* brings angular common module
        FormsModule
    ] //* register standalone components and other modules here
})
export class AppModule {
}
