"use strict";
const executeAndTest = (fn) => {
    const t1 = performance.now();
    fn();
    const t2 = performance.now();
    console.log("time ===>", (t2 - t1) / 1000);
};
// ? ========================================= REVERSED COPY OF STRING =================================
const getReversedCopy = (str) => {
    let reversedStr = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversedStr += str[i];
    }
    return reversedStr;
};
getReversedCopy("cavidan");
// ? ========================================= REVERSED COPY OF STRING =================================
// ? =========================================== SUM OF ALL NUMBERS ====================================
const addUpTo = (num) => {
    let totalNum = 0;
    for (let i = 1; i < num; i++) {
        totalNum += i;
    }
    return totalNum;
};
executeAndTest(() => addUpTo(1000000000));
// ? =========================================== SUM OF ALL NUMBERS ====================================
