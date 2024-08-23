import { Component } from '@angular/core';

import { HeaderComponent } from "./header/header.component";
import { TasksComponent } from "./tasks/tasks.component";
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from "./dummy-users";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HeaderComponent, UserComponent, TasksComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    users = DUMMY_USERS;
    selectedUserId = "u1"

    get selectedUser() {
        return DUMMY_USERS.find(u => u.id === this.selectedUserId);
    }

    onSelectUser(id: string) {
        this.selectedUserId = id;
    }
}
