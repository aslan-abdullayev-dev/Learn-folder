"use strict";
// ==================================================================================================
// ==================================================================================================
function merge2(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
const comboObj2 = merge2(9, "A");
// in this example merge function will try to spread string and number into obj
// ==================================================================================================
// ==================================================================================================
function merge3(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
    // console.log(obj1.length);
}
function printDoubleLength(thing) {
    return thing.length * 2;
}
// printDoubleLength("asd");
// printDoubleLength(["asd"]);
// printDoubleLength({ name: "asd" });
// printDoubleLength(123);
// ! in examples above argument passed to function should have length property, otherwise ts will complain
// ==================================================================================================
// ==================================================================================================
function makeEmptyArray() {
    return [];
}
const strings = makeEmptyArray();
const unknown = makeEmptyArray();
