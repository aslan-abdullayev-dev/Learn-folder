import { Component } from '@angular/core';
import { ControlButtonsComponent } from "./control-buttons/control-buttons.component";

@Component({
  selector: 'ttd-sidebar',
  standalone: true,
  imports: [
    ControlButtonsComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
