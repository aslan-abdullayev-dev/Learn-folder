import { Component, EventEmitter, Input, Output } from '@angular/core';

interface IUser {
    id: string;
    name: string;
    avatar: string;
}

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent {
    @Input({ required: true }) user!: IUser;
    @Output() select = new EventEmitter<string>();

    get imagePath() {
        return `assets/users/${this.user.avatar}`
    }

    onSelectUser() {
        this.select.emit(this.user.id);
    }
}

