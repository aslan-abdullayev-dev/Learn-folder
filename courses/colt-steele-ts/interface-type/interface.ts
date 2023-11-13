interface Person {
  readonly id: number;
  name: string;
  age: number;
  nickname?: string;
}

const aslan: Person = { id: 0, name: "aslan", age: 28 };
const cavidan: Person = { id: 1, name: "cavidan", age: 26 };

aslan.name = "arslan";
aslan.id = 2;

// =====================================================================
// =====================================================================

interface MyPerson {
  name: string;
  age: number;
  sayHi(greetingText: string): string;
  sayBy: (greetingText: string) => string; // error atir
}

const etibar: MyPerson = {
  name: "etibar",
  age: 53,
  sayHi: (greetingText: "salam") => "salam!",
  sayBy: (byText: "salam") => "salam!", // error
};

// =====================================================================
// =====================================================================

interface Dog {
  name: string;
}

interface Dog {
  bark(): string; //reopening interface (different than "type" operator)
}

const elton: Dog = {
  name: "Elton",
  bark() {
    return "WOOF WOOF";
  },
  // bark: () => "WOOF WOOF"
};

// =====================================================================
// =====================================================================

// EXTENDING INTERFACES

interface ServiceDog extends Dog {
  job: "drug sniffer" | "bomb" | "guide dog";
}

const chewy: ServiceDog = {
  name: "Chewy",
  bark: () => "WOOOF",
  job: "drug sniffer",
};

const chewy2: ServiceDog = {
  name: "Chewy",
  bark: () => "WOOOF",
};

// =====================================================================
// =====================================================================

// INTERFACE MULTIPLE INHERITANCE

interface Personn {
  name: string;
}

interface Employee {
  readonly id: number;
  email: string;
}

interface Engineer extends Personn, Employee {
  level: string;
  languages: string[];
}

const toby: Engineer = {
  id: 123,
  name: "Toby",
  email: "toby@mail.com",
  level: "Senior",
  languages: ["English"],
};
