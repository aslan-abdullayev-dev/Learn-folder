import { Component, signal, computed } from '@angular/core';
import { DUMMY_USERS } from "../dummy-users";

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // ! ----------------------- ZONE JS CLASS STATE MANAGEMENT ----------------------- //
  // selectedUser = DUMMY_USERS[randomIndex];
  //
  // get imagePath() {
  //   return `assets/users/${this.selectedUser.avatar}`
  // }
  //
  // onSelectUser() {
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUser = DUMMY_USERS[randomIndex];
  // }
  // ! ----------------------- ZONE JS CLASS STATE MANAGEMENT ----------------------- //
  // ! ----------------------- SIGNAL CLASS STATE MANAGEMENT ----------------------- //
  selectedUser = signal(DUMMY_USERS[randomIndex]);
  imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);

  onSelectUser() {
    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    this.selectedUser.set(DUMMY_USERS[randomIndex]);
  }

  // ! ----------------------- SIGNAL CLASS STATE MANAGEMENT ----------------------- //
}
