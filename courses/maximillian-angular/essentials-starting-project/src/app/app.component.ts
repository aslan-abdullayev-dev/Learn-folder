import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from "./dummy-users";
import { TasksComponent } from "./tasks/tasks.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    HeaderComponent,
    UserComponent,
    TasksComponent
  ]
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId!: string;

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }

  get selectedUser() {
    return DUMMY_USERS.find(du => du.id === this.selectedUserId);
  }
}
