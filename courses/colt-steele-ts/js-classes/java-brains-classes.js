// *==================================================
// *OBJECT BASICS
// *==================================================

const myObj = {
  foo: "Value",
  age: 30,
  address: {
    street: "123 JS",
    city: "JS",
  },
};

// *==================================================
// *CREATING OBJECTS
// *==================================================

const emp1 = {};
emp1.firstName = "Michael";
emp1.lastName = "Scott";
emp1.gender = "M";
emp1.designation = "Regional Manager";

const emp2 = {};
emp2.firstName = "Dwight";
emp2.lastName = "Schrute";
emp2.gender = "M";
emp2.designation = "Assistant to the Regional Manager";

// !code above requires tedious repeat of coding every time. this can be error prone

function createEmployeobject(firstName, lastName, gender, designation) {
  const newObject = {};
  newObject.firstName = firstName;
  newObject.lastName = lastName;
  newObject.gender = gender;
  newObject.designation = designation;

  return newObject;
}

const emp3 = createEmployeobject("Jim", "Halpert", "M", "Sales Manager");

// *==================================================
// *JAVASCRIPT CONSTRUCTORS
// *==================================================

// ! in the code above first line and last line inside "createEmployeobject" are repeating
// ! constructor functions can help us with that

function CreateEmploye(firstName, lastName, gender, designation) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = gender;
  this.designation = designation;
}

const emp4 = new CreateEmploye("Jim", "Halpert", "M", "Sales Manager");

// *==================================================
// *DIFFERENCE BETWEEN CONSTRUCTORS AND REGULAR FUNCTIONS
// *==================================================

const bicycle1 = {
  cadence: 50,
  speed: 20,
  gear: 4,
};

function createBicycle(cadence, speed, gear) {
  const newBicycle = {};
  newBicycle.cadence = cadence;
  newBicycle.speed = speed;
  newBicycle.gear = gear;
  return newBicycle;
}

const bicycle2 = createBicycle(20, 5, 1);
const bicycle3 = new createBicycle(20, 5, 1); // ! regular function called as constructor will work perfectly

function Bicycle(cadence, speed, gear) {
  this.cadence = cadence;
  this.speed = speed;
  this.gear = gear;
}

const bicycle4 = new Bicycle(25, 10, 2);
const bicycle5 = Bicycle(25, 10, 2); // ! this will return undefined and create "cadence", "speed", "gear" properties on global(window) object
// ! window.cadence = 25
// ! window.speed = 10
// ! window.gear = 2

// *==================================================
// *FUNCTION EXECUTION TYPES
// *==================================================

function foo() {
  console.log("foo");
}

// ! foo(); // Method #1

const obj = {};
obj.foo = function () {
  console.log("foo");
};

// ! obj.foo(); // Method #2

// ! new foo(); // Method #3

// ! obj.foo.call({}); // Method #4

// *==================================================
// *VALUE OF "THIS"
// *==================================================

// ! console.log(this); // Window obj

function showThis() {
  return this;
}

// ! console.log(showThis()); // Window obj

const obj2 = {
  name: "obj2",
  foo() {
    return this;
  },
};

// ! console.log(obj2.foo()); // obj2

// ! console.log(new showThis())  empty object

// *==================================================
// *WORKING WITH "THIS" IN OBJECTS
// *==================================================

function Bicycle2(cadence, speed, gear, tirePressure) {
  this.cadence = cadence;
  this.speed = speed;
  this.gear = gear;
  this.tirePressure = tirePressure;
  this.inflateTires = function () {
    this.tirePressure += 3;
  };
}

const bicycle6 = new Bicycle2(50, 20, 4, 25);
// ! bicycle6.inflateTires();

// ! console.log(bicycle6);

function Mechanic(name) {
  this.name = name;
}

const mike = new Mechanic("Mike");
mike.inflateTires = bicycle6.inflateTires;

// ! console.log(mike); // mike obj has inflateTires method

mike.inflateTires(); // ! trying to inflate tires on mike obj

// ! console.log(mike); // now mike obj has tirePressure = NaN

mike.inflateTires.call(bicycle6);

// ! console.log(bicycle6)

// *==================================================
// *CONSTRUCTOR FUNCTION PROBLEMS
// *==================================================

function Bicycle3(cadence, speed, gear, tirePressure) {
  this.cadence = cadence;
  this.speed = speed;
  this.gear = gear;
  this.tirePressure = tirePressure;
  this.inflateTires = function () {
    this.tirePressure += 3;
  };
}

// ! each time function above is called with new keyword, "inflateTires" method created separately

class Trial {
  name = "deneme";
  sayName() {}
  sayDay = () => {};
  sayAge = function () {};
}

const tr1 = new Trial();
const tr2 = new Trial();

// console.log(tr1.sayName === tr2.sayName); // ! true
// console.log(tr1.sayAge === tr2.sayAge); // ! false
// console.log(tr1.sayDay === tr2.sayDay); // ! false

// *==================================================
// *PROTOTYPES (WHAT HAPPENS WHEN FUNCTIONS CREATED)
// *==================================================

function myFunc() {
  this.instanceProperty = "myFunc instanceProperty value";
}
// console.log(typeof myFunc); // ! function
//  ! js engine will create second "proto" object for each new function

// console.log(myFunc.prototype) // ! points to function`s prototype

const myObj2 = new myFunc();
const myObj3 = new myFunc();
// console.log(myObj2)
// console.log(myObj3)

// console.log(myObj2.__proto__); // ! "myObj2.__proto__", "myObj3.__proto__" also points to function`s prototype
// console.log(myObj2.__proto__ === myObj3.__proto__); // ! true

myFunc.prototype.test = "myFunc prototype value";
// console.log(myFunc.prototype) // ! {test: myFunc prototype value, constructor: myFunc() {}}
// console.log(myObj2.__proto__); // ! {test: myFunc prototype value, constructor: myFunc() {}}
// console.log(myObj3.__proto__); // ! {test: myFunc prototype value, constructor: myFunc() {}}
// console.log(myObj2.test) // ! 1) js will look inside myObj2 ; 2) js will look inside myFunct.prototype ; 3) js will look inside Object prototype

// *==================================================
// *PROPERTY LOOKUP WITH PROTOTYPES
// *==================================================

function boo() {}

boo.prototype.hi = "hi";

const booObj = new boo();

// console.log(boo.prototype === booObj.__proto__); // ! true

// ---------------------------------------------------------
// ---------------------------------------------------------

class PrototypeTest {
  sayHi() {} // ! goes into prototype
  sayBy = function () {}; // ! goes into class properties
}

const test1 = new PrototypeTest();
const test2 = new PrototypeTest();

console.log("test1", test1)

// console.log(test1.sayHi === test2.sayHi); // ! true
// console.log(test1.sayBy === test2.sayBy); // ! false

// *==================================================
// *OBJECT BEHAVIORS USING PROTOTYPES
// *==================================================

class Car {
  static description = "Means of transport"; // this property does not exist on individual instances of class, but on class itself
  name = "hi";
}

const audi = new Car();

console.log(audi); // !  undefined
// console.log(Car); // ! "Means of transport"
