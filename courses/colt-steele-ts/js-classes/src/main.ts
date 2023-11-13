class PlayerError {
  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
}

class Player {
  first: string;
  last: string;
  score: number = 0;
  readonly birth: number = 1994;
  private password: number = 1234;
  #oldPassword: number = 4321;

  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
}

const aslan = new Player("aslan", "abdullayev");
aslan.score = "2";
aslan.score = 2;
aslan.password;
// aslan.#oldPassword;

// * ===================================================
// * CLASS PARAMETER PROPERTIES SHORTHAND
// * ===================================================

class PlayerShorthand {
  constructor(public first: string, public last: string) {}
}

// * ===================================================
// * CLASS GETTERS SETTERS
// * ===================================================

class PlayerGetter {
  first: string;
  last: string;
  private _score: number = 0;

  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }

  get fullName(): string {
    return `${this.first} ${this.last}`;
  }
  get score(): number {
    return this._score;
  }
  set score(newScore: number) {
    this._score = newScore;
  }
}

let cavidan = new PlayerGetter("cavidan", "abdullayev");
cavidan.score;
// cavidan.score = 10;
// cavidan.score = "10";
