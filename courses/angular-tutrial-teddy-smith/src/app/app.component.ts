import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    NgClass,
  ],
  styleUrl: './app.component.css',
})

export class AppComponent {
  title: string = 'basket of baby beavers';
  imgSrc: string = "https://media.istockphoto.com/id/1696167872/photo/aerial-view-of-forest-at-sunset-on-the-background-of-mountains-in-dolomites.jpg?s=2048x2048&w=is&k=20&c=uLAmWeg4couEsq_U62PY4mfUnM7Zut1RxGYDHhqYCNs="
  favAnimal: string = "Dog"
  pokemonName: string = ""
  isCool: boolean = false;
  isActive: boolean = true;

  handleClick(value: any) {
    console.log(value);
  }
}

