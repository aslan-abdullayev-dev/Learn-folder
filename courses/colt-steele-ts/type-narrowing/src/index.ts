//  ! ========================================================================================================================
//  ! ============================================== NARROWING WITH IN OPERATOR ==============================================
//  ! ========================================================================================================================

interface Movie {
  title: string;
  duration: number;
}

interface TVShow {
  title: string;
  numEpisodes: number;
  episodeDuration: number;
}

function getRuntime(media: Movie | TVShow) {
  if ("numEpisodes" in media) {
    // * ts understands media can only be TVShow type
    media.numEpisodes = 10;
  }
}

//  ! ========================================================================================================================
//  ! ========================================== NARROWING WITH INSTANCEOF OPERATOR ==========================================
//  ! ========================================================================================================================

function printFullDate(date: string | Date) {
  if (date instanceof Date) {
    return date.toUTCString();
  }
  return new Date(date).toUTCString();
}

// ================================================

class User {
  constructor(public userName: string) {}
}

class Company {
  constructor(public name: string) {}
}

function printName(entity: User | Company) {
  if (entity instanceof User) {
    return entity.userName;
  }
}

//  ! ======================================================================================================================
//  ! ========================================= NARROWING WITH PREDICATES OPERATOR =========================================
//  ! ======================================================================================================================

interface Cat {
  name: string;
  numLives: number;
}

interface Dog {
  name: string;
  breed: string;
}

function isCat(animal: any): animal is Cat {
  // * this syntax is binding return type with the logic of the function (function must return boolean)
  // * if function return true then ts willknow that returned value is the type of Cat
  // * if we delete "animal is Cat" part, then ts would not know what is the return type (check it on makeNoise function below)
  return (animal as Cat).numLives !== undefined;
}

function makeNoise(animal: Cat | Dog): string {
  if (isCat(animal)) {
    return "meow";
  }
  return "woof";
}

//  ! ======================================================================================================================
//  ! ======================================== NARROWING WITH DISCRIMINATED UNIONS =========================================
//  ! ======================================================================================================================

interface Rooster {
  name: string;
  weight: number;
  age: number;
  kind: "Rooster";
}

interface Cow {
  name: string;
  weight: number;
  age: number;
  kind: "Cow";
}

interface Pig {
  name: string;
  weight: number;
  age: number;
  kind: "Pig";
}

type FarmAnimal = Rooster | Cow | Pig;

function getFarmAnimalSound(animal: FarmAnimal) {
  if (animal.kind === "Pig") {
    // * ts will know here that animal object is Rooster interface
    return "Oink";
  }
  if (animal.kind === "Cow") {
    return "Moo";
  }
  if (animal.kind === "Rooster") {
    return "Doodldoo";
  }
  const shouldNeverGetHere: never = animal;
  return shouldNeverGetHere;
  // * we should never make it here if all cases handled correctly
  // * comment out last if option to see how ts will warn you
  // * it is because not all cases going to be handled and animal can not be assigned to type never
  // * so, assigning to type never as default makes sure that all cases are handled above
}
console.log(
  "getFarmAnimalSound ===>",
  getFarmAnimalSound({ name: "steevie", weight: 2, age: 1.2, kind: "Rooster" })
);
