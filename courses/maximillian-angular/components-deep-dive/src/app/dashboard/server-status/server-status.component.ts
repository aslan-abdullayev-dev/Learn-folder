import { Component, DestroyRef, inject, OnInit } from '@angular/core';

type TServerStatus = "online" | "offline" | "unknown"

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent implements OnInit {
  currentStatus: TServerStatus = 'unknown';
  destroyRef = inject(DestroyRef)

  ngOnInit() {
    const intervalId = setInterval(() => {
      const serverStatusOptions: TServerStatus[] = ["online", "offline", "unknown"];
      const randomIdx = Math.floor(Math.random() * serverStatusOptions.length);
      this.currentStatus = serverStatusOptions[randomIdx]
    }, 3000)

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId)
    })
  }
}
