import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { ITicket } from "./tickets.model";
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets: ITicket[] = [];

  onAdd(ticketData: { title: string; text: string }) {
    this.tickets.push({
      title: ticketData.title,
      request: ticketData.text,
      status: "open",
      id: Math.random().toString(),
    })
  }

  onCompleteTicket(id: string) {
    this.tickets = this.tickets.map(ticket => {
      if (ticket.id === id) {
        return { ...ticket, status: "closed" }
      } else {
        return ticket
      }
    })
  }
}
