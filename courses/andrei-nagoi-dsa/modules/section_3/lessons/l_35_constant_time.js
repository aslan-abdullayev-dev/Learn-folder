export const l_35_constant_time = () => {
  const boxes = [1, 2, 3, 4, 5, 6, 7]

  function logFirstTwoBoxes(boxes) {
    console.log(boxes[0]);//* O(1)
    console.log(boxes[1]); //* O(2)
  }

  logFirstTwoBoxes(boxes) //* O(2) --> Constant Time
}