// ==================================================================================================
// ==================================================================================================

function merge2<T, U>(obj1: T, obj2: U) {
  return { ...obj1, ...obj2 };
}

const comboObj2 = merge2(9, "A");
// in this example merge function will try to spread string and number into obj

// ==================================================================================================
// ==================================================================================================

function merge3<T extends object, U extends object>(obj1: T, obj2: U) {
  return { ...obj1, ...obj2 };
  // console.log(obj1.length);
}

// ! const comboObj3 = merge3(9, "A");
// here it is not possible to pass parameters other than objects anymore

// ==================================================================================================
// ==================================================================================================

interface Lengthy {
  length: number;
}

function printDoubleLength<T extends Lengthy>(thing: T): number {
  return thing.length * 2;
}

// printDoubleLength("asd");
// printDoubleLength(["asd"]);
// printDoubleLength({ name: "asd" });
// printDoubleLength(123);

// ! in examples above argument passed to function should have length property, otherwise ts will complain

// ==================================================================================================
// ==================================================================================================

function makeEmptyArray<T>(): T[] {
  return [];
}

const strings = makeEmptyArray<string>();
const unknown = makeEmptyArray();
