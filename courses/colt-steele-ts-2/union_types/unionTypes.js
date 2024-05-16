var coordinates;
coordinates = { lat: 0, long: 0 };
// coordinates = { x: 1, lat: 34 };
console.log(coordinates);
// ======================================
function printAge(age) {
    console.log("You are ".concat(age, " years old."));
}
printAge(23);
printAge("87");
function getAge(age) {
    if (typeof age === "number") {
        return age;
    }
    else if (typeof age === "string") {
        return isNaN(parseInt(age)) ? null : parseInt(age);
    }
    return null;
}
var age = getAge("asda");
console.log("age ==>", age);
