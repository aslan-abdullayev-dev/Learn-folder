function square(num) {
    return num * num;
}
square(3);
square(true);
square("asd");
function ts_square(num) {
    return num * num;
}
// ts_square("asd")
// ts_square(true)
function print_number(num) {
    if (num === void 0) { num = undefined; }
    console.log("num ==>", num);
    var a = num + 1;
}
