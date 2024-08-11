import { Component, ElementRef, ViewChild } from '@angular/core';
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

  handleSubmit(
    titleElement: HTMLInputElement,
    requestElement: HTMLTextAreaElement
  ) {
    // console.log("titleElement", titleElement.value)
    // console.log("requestElement", requestElement.value)
    this.form?.nativeElement.reset()
  }
}
