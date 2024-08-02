import { Component } from '@angular/core';
import { DUMMY_USERS } from "./dummy-users";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;
  selectedUserId?: string;

  onSelectUser(id: string) {
    this.selectedUserId = id;
  }

  get selectedUser() {
    return DUMMY_USERS.find(du => du.id === this.selectedUserId);
  }
}
