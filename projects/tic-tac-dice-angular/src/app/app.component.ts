import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { LeftSidebarComponent } from "./left-sidebar/left-sidebar.component";
import { RightSidebarComponent } from "./right-sidebar/right-sidebar.component";
import { BoardComponent } from "./board/board.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, LeftSidebarComponent, RightSidebarComponent, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
