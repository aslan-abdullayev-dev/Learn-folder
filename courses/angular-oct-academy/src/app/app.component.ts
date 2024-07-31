import { Component } from '@angular/core';
import { AppNavbar } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [AppNavbar]
})
export class AppComponent {
  title: string = 'angular-oct-academy';
}
