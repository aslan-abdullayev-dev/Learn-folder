import { Component, EventEmitter, Output } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from "../../../shared/button/button.component";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ControlComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  @Output() public add = new EventEmitter<{ title: string; text: string }>();
  title = "";
  request = "";

  handleSubmit() {
    this.add.emit({ title: this.title, text: this.request })
    this.title = ""
    this.request = ""
  }
}
