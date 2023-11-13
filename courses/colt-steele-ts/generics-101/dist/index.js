"use strict";
// ! ======================================================================================
// ! ======================================================================================
// nums and nums2 are essentially the same
const nums2 = [];
const nums = [];
// ! ======================================================================================
// ! ======================================================================================
// queryselector method in js uses generic typing
const inputEl = document.querySelector("#username");
inputEl.value = "10";
const btn = document.querySelector(".btn");
btn.innerHTML = "js";
// ! ======================================================================================
// ! ======================================================================================
// identity is generic function
function identity(item) {
    return item;
}
identity("7");
identity(7);
identity({ name: "A", breed: "lion" });
// ! ======================================================================================
// ! ======================================================================================
function getRandomElement(list) {
    const randomIdx = Math.floor(Math.random() * list.length);
    return list[randomIdx];
}
const randomItem = getRandomElement(["a", "b", "c"]);
const randomItem2 = getRandomElement([1, 2, 3]); // number type inferred
// ! ======================================================================================
// ! ======================================================================================
function merge(obj1, obj2) {
    // return type is inferred
    return Object.assign(Object.assign({}, obj1), obj2);
}
const comboObj = merge({ name: "a" }, { age: 16 });
// T and U are inferred
