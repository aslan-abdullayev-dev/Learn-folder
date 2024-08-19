import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITicket } from "../tickets.model";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input({ required: true }) data!: ITicket;
  @Output() complete = new EventEmitter<string>();
  detailsVisible: boolean = false;

  onToggleDetails() {
    this.detailsVisible = !this.detailsVisible;
  }

  onComplete() {
    this.complete.emit(this.data.id)
  }
}
