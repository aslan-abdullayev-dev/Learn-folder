// ! ======================================================================================
// ! ======================================================================================

// nums and nums2 are essentially the same

const nums2: Array<number> = [];
const nums: number[] = [];

// ! ======================================================================================
// ! ======================================================================================

// queryselector method in js uses generic typing

const inputEl = document.querySelector<HTMLInputElement>("#username")!;
inputEl.value = "10";

const btn = document.querySelector<HTMLButtonElement>(".btn")!;
btn.innerHTML = "js";

// ! ======================================================================================
// ! ======================================================================================

// identity is generic function

function identity<T>(item: T): T {
  return item;
}

identity<string>("7");
identity<number>(7);

interface Cat {
  name: string;
  breed: string;
}

identity<Cat>({ name: "A", breed: "lion" });

// ! ======================================================================================
// ! ======================================================================================

function getRandomElement<T>(list: T[]): T {
  const randomIdx = Math.floor(Math.random() * list.length);
  return list[randomIdx];
}

const randomItem = getRandomElement<string>(["a", "b", "c"]);
const randomItem2 = getRandomElement([1, 2, 3]); // number type inferred

// ! ======================================================================================
// ! ======================================================================================

function merge<T, U>(obj1: T, obj2: U) {
  // return type is inferred
  return { ...obj1, ...obj2 };
}

const comboObj = merge({ name: "a" }, { age: 16 });
// T and U are inferred
