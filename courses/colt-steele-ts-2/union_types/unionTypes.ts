type Point = {
  x: number;
  y: number;
}
type Loc = {
  lat: number;
  long: number;
}

let coordinates: Point | Loc;
coordinates = { lat: 0, long: 0 }
// coordinates = { x: 1, lat: 34 };

console.log(coordinates)

// ======================================
function printAge(age: number | string): void {
  console.log(`You are ${age} years old.`)
}

printAge(23)
printAge("87")

function getAge(age: (number | string)) {
  if (typeof age === "number") {
    return age
  } else {
    if (isNaN(parseInt(age))) {
      return parseInt(age)
    } else {
      return null
    }
  }
}

const age = getAge("asda")
console.log("age ==>", age)
