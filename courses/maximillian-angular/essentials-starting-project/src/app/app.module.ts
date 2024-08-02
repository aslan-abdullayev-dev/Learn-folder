import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { UserComponent } from "./user/user.component";
import { HeaderComponent } from "./header/header.component";
import { TasksComponent } from "./tasks/tasks.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HeaderComponent,
    UserComponent,
    TasksComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
