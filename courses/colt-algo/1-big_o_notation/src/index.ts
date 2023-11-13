const executeAndTest = (fn: Function): void => {
  const t1 = performance.now();
  fn();
  const t2 = performance.now();
  console.log("time ===>", (t2 - t1) / 1000);
};

// ? ========================================= REVERSED COPY OF STRING =================================
const getReversedCopy = (str: string): string => {
  let reversedStr: string = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversedStr += str[i];
  }
  return reversedStr;
};
getReversedCopy("cavidan");
// ? ========================================= REVERSED COPY OF STRING =================================

// ? =========================================== SUM OF ALL NUMBERS ====================================
const addUpTo = (num: number): number => {
  let totalNum: number = 0;
  for (let i = 1; i < num; i++) {
    totalNum += i;
  }
  return totalNum;
};
executeAndTest(() => addUpTo(1_000_000_000));
// ? =========================================== SUM OF ALL NUMBERS ====================================
