"use strict";
var _Player_oldPassword;
class PlayerError {
    constructor(first, last) {
        this.first = first;
        this.last = last;
    }
}
class Player {
    constructor(first, last) {
        this.score = 0;
        this.birth = 1994;
        this.password = 1234;
        _Player_oldPassword.set(this, 4321);
        this.first = first;
        this.last = last;
    }
}
_Player_oldPassword = new WeakMap();
const aslan = new Player("aslan", "abdullayev");
aslan.score = "2";
aslan.score = 2;
aslan.password;
// aslan.#oldPassword;
// * ===================================================
// * CLASS PARAMETER PROPERTIES SHORTHAND
// * ===================================================
class PlayerShorthand {
    constructor(first, last) {
        this.first = first;
        this.last = last;
    }
}
// * ===================================================
// * CLASS GETTERS SETTERS
// * ===================================================
class PlayerGetter {
    constructor(first, last) {
        this._score = 0;
        this.first = first;
        this.last = last;
    }
    get fullName() {
        return `${this.first} ${this.last}`;
    }
    get score() {
        return this._score;
    }
    set score(newScore) {
        this._score = newScore;
    }
}
let cavidan = new PlayerGetter("cavidan", "abdullayev");
cavidan.score;
// cavidan.score = 10;
// cavidan.score = "10";
