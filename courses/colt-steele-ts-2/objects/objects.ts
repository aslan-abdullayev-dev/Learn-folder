interface DogInterface {
  readonly id: number;
  name: string;
  breed: string;
  age: number;
  parents?: {
    mother: DogInterface;
    father: DogInterface;
  }
}

interface RaceDogInterface extends DogInterface {
  titles: string[];
  years_of_experience: number;
}

const myDog: RaceDogInterface = {
  id: 1,
  name: "Elton",
  breed: "Australian Shepherd",
  age: 5,
  titles: ["Australia Champion"],
  years_of_experience: 2,
}

function printDog(dog_obj: DogInterface): void {
  const { breed, name, age } = dog_obj;
  const dogInfoStr: string = `${name} (${age} years old): ${breed}`;
  console.log(dogInfoStr)
}

printDog(myDog)
//!---------------------------------
//!---------------------------------
interface Circle {
  radius: number;
}

interface Colorful {
  color: string;
}

interface ColorfulCircle extends Circle, Colorful {
}

const a: ColorfulCircle = {
  color: "",
  radius: 5
}
//!---------------------------------
//!---------------------------------
interface Cat {
  numLives: number;
}

interface Dog {
  breed: string;
}

interface CatDog extends Cat, Dog {
  age: number;
}

const myAnimal: CatDog = {
  age: 7,
  breed: "Husky",
  numLives: 7,
}