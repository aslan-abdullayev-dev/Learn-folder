import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { UserComponent } from "./user/user.component";
import { HeaderComponent } from "./header/header.component";
import { SharedModule } from "./shared/shared.module";
import { TasksModule } from "./tasks/tasks.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
  ],
  imports: [BrowserModule, SharedModule, TasksModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
