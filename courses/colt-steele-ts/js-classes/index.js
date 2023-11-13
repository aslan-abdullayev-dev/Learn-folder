class Player {
  score = 0;
  numLives = 10;

  constructor(first, last) {
    // constructor function is automatically executed when given class is initiated

    this.first = first;
    this.last = last;
  }

  taunt() {
    console.log("BOOYAH !");
  }

  loseLife() {
    this.numLives -= 1;
  }
}

const player1 = new Player("blue", "steele");
const player2 = new Player("aslan", "abdullayev");

player1.loseLife();

// console.log(player1);
// console.log(player2);

// ================================================================
// Private fields in classes
// ================================================================

class Footballer {
  #goals = 0;

  constructor(name) {
    this.name = name;
    // this.#secret();
  }

  getScore() {
    return this.#goals;
  }

  scoreGoal() {
    this.#goals += 1;
  }

  #secret() {
    console.log("secret class method worked");
  }
}

const ronaldo = new Footballer("ronaldo");

// console.log(ronaldo);

// ronaldo.scoreGoal();

// console.log(ronaldo);

// console.log(ronaldo.getScore())

// ================================================================
// CLASS GETTERS AND SETTERS
// ================================================================

class Language {
  #name;
  #framework;
  //   #backend;

  constructor(name) {
    this.#name = name;
  }

  get getName() {
    return this.#name;
  }

  set framework(newName) {
    if (!newName.trim()) {
      throw new Error("Enter valid name please");
    }
    this.#framework = newName;
  }
}

const js = new Language("javascript");

// js.framework = "node";
// console.log(js);
// js.framework = "";

// ---------------------------------
// ---------------------------------

class Computer {
  #name;
  #yearsOld = 0;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get yearsOld() {
    return this.#yearsOld;
  }

  set yearsOld(yearsOld) {
    if (yearsOld < 0) {
      throw new Error("Computer age can not be negative number");
    }
    this.#yearsOld = yearsOld;
  }
}

const samsung = new Computer("samsung");

const samsungAge = samsung.yearsOld;
// console.log("samsungAge", samsungAge);

const samsungNewAge = (samsung.yearsOld = 1);
// console.log("samsungNewAge", samsungNewAge);

// ================================================================
// STATIC PROPERTIES AND METHODS
// ================================================================

class Car {
  static description = "Means of transport"; // this property does not exist on individual instances of class, but on class itself
}

const audi = new Car();

audi.description; // undefined
Car.description; // "Means of transport"

// ================================================================
// EXTENDING CLASSES
// ================================================================

class Account {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class Admin extends Account {
  isAdmin = true;
}

const profile = new Account("aslan", "gmail");

const admin = new Admin();
const admin2 = new Admin("cavidan", "yahoo"); // props going as parameters into parent class constructor

// console.log("profile ->>>", profile);
// console.log("admin ->>>", admin); // name, email undefined
// console.log("admin2 ->>>", admin2); // name = cavidan, email = yahoo

// --------------------------------------
// --------------------------------------

class Horse {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class RaceHorse extends Horse {
  // if there is a need for a constructor inside a child class also, super() will transfer parameters to parent class
  constructor(name, age, wins) {
    super(name, age);
    this.wins = wins;
  }
}

class GarabagAti extends RaceHorse {
  constructor(name, age, wins, yiyesineQismet) {
    super(name, age, wins);
    this.yiyesineQismet = yiyesineQismet;
  }
}

const horse1 = new RaceHorse("horse", 3, 6);
const qarabagh = new GarabagAti("horse", 3, 6, true);

// console.log("horse1 ->>", horse1);
// console.log("qarabagh ->>", qarabagh);
