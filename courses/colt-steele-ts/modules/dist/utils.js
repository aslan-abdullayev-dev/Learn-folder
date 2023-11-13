// * if there is no export or top level await inside ts file it is considered as non module
// * all methods and values of non module file are accessible from other ts files not requiring import keyword
// * function add down below has to be imported because it was exported and this file is module now
export function add(x, y) {
    return x + y;
}
export function sample(arr) {
    const idx = Math.floor(Math.random() * arr.length);
    return arr[idx];
}
