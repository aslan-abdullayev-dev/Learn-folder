import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type TUser } from "./user.model";

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  @Input({ required: true }) user!: TUser;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  get imagePath() {
    return `assets/users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }

  // ----------------------- ZONE JS CLASS STATE MANAGEMENT ----------------------- //
  // @Input({ required: true }) avatar!: string;
  // @Output() select = new EventEmitter();
  // selectedUser = DUMMY_USERS[randomIndex];
  //
  // get imagePath() {
  //   return `assets/users/${this.selectedUser.avatar}`
  // }
  //
  // onSelectUser() {
  //   this.select.emit(this.id);
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUser = DUMMY_USERS[randomIndex];
  // }
  // ----------------------- ZONE JS CLASS STATE MANAGEMENT ----------------------- //
  // ------------------------ SIGNAL CLASS STATE MANAGEMENT ------------------------ //
  // avatar = input.required<string>()
  // name = input.required<string>()
  // select = output<string>()
  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(() => `assets/users/${this.selectedUser().avatar}`);
  //
  // onSelectUser() {
  //   this.select.emit(this.id);
  //   const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
  //   this.selectedUser.set(DUMMY_USERS[randomIndex]);
  // }
  // ------------------------ SIGNAL CLASS STATE MANAGEMENT ------------------------ //
}
