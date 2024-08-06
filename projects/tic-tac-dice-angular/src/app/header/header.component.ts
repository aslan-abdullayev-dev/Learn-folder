import { Component } from '@angular/core';
import { CubeComponent } from "../shared/components/cube/cube.component";

@Component({
  selector: 'ttd-header',
  standalone: true,
  imports: [
    CubeComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
