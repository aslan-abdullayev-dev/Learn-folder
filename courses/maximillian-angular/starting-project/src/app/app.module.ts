import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { UserComponent } from "./user/user.component";
import { HeaderComponent } from "./header/header.component";
import { TasksModule } from "./tasks/tasks.module";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        UserComponent,
    ], //* register all the components and directives
    bootstrap: [AppComponent], //* start application bootstrap from this component
    imports: [
        BrowserModule, //* brings angular common module
        SharedModule,
        TasksModule
    ] //* register standalone components and other modules here
})
export class AppModule {
}
