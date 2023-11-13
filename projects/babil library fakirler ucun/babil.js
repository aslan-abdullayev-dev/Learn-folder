// elimizde char listi var
// random sekilde bu listden char secib babil librari stringe elave edecek
// her elaveden sonra random sekilde space qoyacaq ya da qoymayacaq

const CHAR_LIST = ["a", "s", "l"];

let babilLibrary = "";

const getRandomChar = (arr_of_chars) => {
  let randomChar = Math.floor(Math.random() * 3);

  return arr_of_chars[randomChar];
};

const getRandomSpace = () => {
  let isSpace;

  let binaryResult = Math.round(Math.random());
  binaryResult ? (isSpace = true) : (isSpace = false);

  return isSpace;
};

const testGetRandomChar = (arr_of_chars) => {
  const RANDOM_SAMPLE = {};
  for (let i = 0; i < 100000; i++) {
    let randomChar = getRandomChar(arr_of_chars);

    RANDOM_SAMPLE[randomChar]
      ? RANDOM_SAMPLE[randomChar]++
      : (RANDOM_SAMPLE[randomChar] = 1);
  }
  console.log("RANDOM_SAMPLE ->", RANDOM_SAMPLE);
};

const libraryGenerator = (arr_of_chars) => {
  for (let i = 0; i < 1_000_000_0; i++) {
    let randomChar = getRandomChar(arr_of_chars);
    let isSpace = getRandomSpace();

    babilLibrary += randomChar;
    if (isSpace) babilLibrary += " ";
  }
};

const findInLibrary = () => {

    const search = prompt("asl axtar")
    
    const result = babilLibrary.indexOf(search)
    alert(result)
}


libraryGenerator(CHAR_LIST)
findInLibrary()

