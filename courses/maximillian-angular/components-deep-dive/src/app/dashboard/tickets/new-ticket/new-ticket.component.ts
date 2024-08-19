import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
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
  @ViewChild("form") private form?: ElementRef<HTMLFormElement>;
  @Output() public add = new EventEmitter<{ title: string; text: string }>();

  handleSubmit(title: string, text: string) {
    this.add.emit({ title, text })
    this.form?.nativeElement.reset()
  }
}
