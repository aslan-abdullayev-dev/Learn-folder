const activeUsers: string[] = [];
const activeUsers2: [] = ["aslan"]; // error. expected empty array
const activeUsers3: string[] = [];
const activeUsers4: string[] = ["aslan"];

const names: string[] = [];
names.push("Aslan");
names.push(123);

// ==================================================
// ==================================================

const bools: Array<boolean> = [];
const bools2: boolean[] = []; // bools and bools2 are basically the same
names.push(123);

// ==================================================
// ==================================================

type Point = {
  x: number;
  y: number;
};

const coordinates: Point[] = [];

const coordinates2: Point[] = [
  {
    x: 43,
    y: 22,
  },
];

const coordinates3: Array<Point> = [
  {
    x: 43,
    y: 22,
  },
];

const coordinates4: Array<Point> = [
  {
    x: 43,
    y: "22",
  },
];

const coordinates5: Array<Point> = [
  {
    y: 22,
  },
];

// ==================================================
// ==================================================

const board: string[] = ["a", "b"];
const multi: string[][] = [["a"], ["b"]];

// ==================================================
// ==================================================

