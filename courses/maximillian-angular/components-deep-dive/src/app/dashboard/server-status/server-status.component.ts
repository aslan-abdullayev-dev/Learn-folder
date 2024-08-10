import { Component, Input } from '@angular/core';

type TServerStatus = "online" | "offline" | "unknown"

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent {
  currentStatus: TServerStatus = 'unknown';

  constructor() {
    setInterval(() => {
      const serverStatusOptions: TServerStatus[] = ["online", "offline", "unknown"];
      const randomIdx = Math.floor(Math.random() * serverStatusOptions.length);
      this.currentStatus = serverStatusOptions[randomIdx]
    }, 5000)
  }
}
