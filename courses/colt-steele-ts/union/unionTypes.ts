let age: number | string;
age = 25;
age = "25";
age = true;

// ==============================================================
// ==============================================================

type Point = {
  x: number;
  y: number;
};

type Loc = {
  lat: number;
  long: number;
};

let coordinates: Point | Loc; // data should cover at least one of "Point" or "Loc" types fully. Also can`t have key that is not covered in "Point" or "Loc"

coordinates = { x: 1, y: 34 };
coordinates = { lat: 132, long: 66 };
coordinates = { lat: 132, long: 66, x: 21, y: 34 };
coordinates = { lat: 132, long: 66, x: 21 };
coordinates = { lat: 132, y: 66 };
coordinates = { lat: 132, long: 66, x: 21, y: 34, z: 56 };

// ==============================================================
// ==============================================================

type ArrOfStr = string[];
type ArrOfNum = number[];

let testArr: ArrOfStr | ArrOfNum; // string[] | number[]. not the same as (string | number)[]
testArr = ["as"];
testArr = [123];
testArr = ["123", 321]; // "testArr" can be either string array or number array

// ==============================================================
// ==============================================================

type StrNum = string | number;

let testArr2: StrNum[];
testArr2 = ["as"];
testArr2 = [123];
testArr2 = ["123", 321];
