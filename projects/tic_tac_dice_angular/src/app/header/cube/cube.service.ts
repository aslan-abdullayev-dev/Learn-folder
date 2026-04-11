import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class CubeService {
  private min = 1;
  private max = 12;

  rollTheDice = () => {
    const xRand = this.getRandom(this.max, this.min);
    const yRand = this.getRandom(this.max, this.min);

    return {
      CSSRotation: 'rotateX(' + xRand + 'deg) rotateY(' + yRand + 'deg)',
      result: {
        x: xRand % 360,
        y: yRand % 360
      }
    }
  }

  private getRandom(max: number, min: number) {
    return (Math.floor(Math.random() * (max - min)) + min) * 90;
  }
}
