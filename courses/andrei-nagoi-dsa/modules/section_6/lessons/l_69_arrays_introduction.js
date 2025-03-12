export const l_69_arrays_introduction = () => {
  const strings = ["a", "b", "c", "d"];

  //* in 32 bit(4 bytes) operation system array of 4 items will hold up space of 4 * 4 --> 16 bytes.

  let thirdItem = strings[2] //* Access --> O(1)
  strings.push("e") //* --> O(1)
  strings.pop() //* --> O(1)
  strings.unshift("x") //* --> O(n)
  strings.splice(2, 0, "alien") //* --> O(n)
}