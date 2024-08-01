import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalcScreenComponent } from "./calc-screen/calc-screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalcScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'calculator-angular';
}
