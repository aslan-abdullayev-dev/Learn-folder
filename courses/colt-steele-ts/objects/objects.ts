function printName(person: { first: string; last: string }): void {
  console.log(`${person.first} ${person.last}`);
}
const singer = { first: "Thomas", last: "Jenkins", age: 32 };

printName({ first: "Thomas", last: "Jenkins" });

printName({ first: "Thomas", last: "Jenkins", age: 32 }); // error -> data should be exactly the same

printName(singer); // no errors -> unless "first" or "last" keys are missing in the singer object

// ===================================================================
// ===================================================================

type Point = {
  x: number;
  y: number;
};

const coordinate: { x: number; y: number } = {
  x: 34,
  y: 2,
};

function randomCoordinate(): { x: number; y: number } {
  return {
    x: Math.random(),
    y: Math.random(),
  };
}

function doubleCoordinate(point: Point): Point {
  return { x: point.x * 2, y: point.y * 2 };
}

// ===================================================================
// ===================================================================

type Person = {
  // type alias
  name: string;
  age: number;
};

const sayHappyBirthday = (person: Person): string => {
  return `Hey ${person.name}, congrats on turning ${person.age}`;
};

const aslan: Person = { name: "Aslan", age: 28, lastName: "Abdullayev" };

const aslan2 = { name: "Aslan", age: 28, lastName: "Abdullayev" };

sayHappyBirthday({ name: "Aslan", age: 28 });

sayHappyBirthday({ name: "Aslan", age: 28, lastName: "Abdullayev" });

sayHappyBirthday(aslan);

// ===================================================================
// ===================================================================

const describePerson = (person: {
  name: string;
  age: number;
  parentNames: {
    mom: string;
    dad: string;
  };
}) => {
  return `Person: ${person.name},
  Age: ${person.name},
  Parents: ${person.parentNames.mom}, ${person.parentNames.dad}`;
};

describePerson({
  name: "Jimmy",
  age: 10,
  parentNames: {
    mom: "Kim",
    dad: "Steve",
  },
});

// ===================================================================
// ===================================================================

type Song = {
  title: string;
  artist: string;
  numStreams: number;
  credits: {
    producer: string;
    writer: string;
  };
};

const songData1: Song = {
  title: "Unchained Melody",
  artist: "Righteous Brothers",
  numStreams: 213412,
  credits: {
    producer: "Phil Brothers",
    writer: "Alext North",
  },
};

function calculatePayout(song: Song): number {
  return song.numStreams * 0.0033;
}

function printSong(song: Song): void {
  console.log(`${song.title} - ${song.artist}`);
}

calculatePayout(songData1);

// ===================================================================
// ===================================================================

type SongOptionalFields = {
  title?: string;
  artist: string;
  numStreams: number;
  credits: {
    producer?: string;
    writer: string;
  };
};

// ===================================================================
// ===================================================================

type SongReadOnlyFileds = {
  readonly id: number;
  title: string;
  artist: string;
  numStreams: number;
  credits: {
    producer: string;
    writer: string;
  };
};

const songData2: SongReadOnlyFileds = {
  id: 10,
  title: "Unchained Melody",
  artist: "Righteous Brothers",
  numStreams: 213412,
  credits: {
    producer: "Phil Brothers",
    writer: "Alext North",
  },
};

songData2.artist = "Righteous";
songData2.id = 10; // can not reassign value to readonly property

// ===================================================================
// ===================================================================

type Circle = {
  radius: number;
};

type CircleColor = {
  color: number;
};

type Colorful = {
  color: string;
};

type ColorfulCircle = Circle & Colorful; //intersection type (all the keys from "Circle" and "Colorful" should be there)
type ColorfulCircle2 = CircleColor & Colorful; //intersection type
type ColorfulCircle3 = CircleColor & Colorful & { height: number }; //intersection type

const happyFace: ColorfulCircle = {
  radius: 10,
  color: "red",
};

const happyFace2: ColorfulCircle2 = {
  // on CircleColor color is set to number,
  // on Colorful color is set to string.
  // type of the "color" property became "never" type
  color: "red",
};

// ===================================================================
// ===================================================================

type strArr = string[];
type numArr = number[];

type strNumArr = strArr & numArr; //intersection type for arrays

const strNumArr1: strNumArr = [];
const strNumArr2: strNumArr = ["as"];
const strNumArr3: strNumArr = [123];
const strNumArr4: strNumArr = [123, "123"];
