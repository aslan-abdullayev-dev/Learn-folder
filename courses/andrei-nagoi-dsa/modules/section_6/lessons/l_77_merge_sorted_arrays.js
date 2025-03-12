export const l_77_merge_sorted_arrays = () => {
  const mergeSortedArrays = (arr1, arr2) => {
    if (arr1.length === 0) return arr2;
    if (arr2.length === 0) return arr1;

    const mergedArr = []
    let pointer1 = 0
    let pointer2 = 0

    while (pointer1 <= arr1.length - 1 || pointer2 <= arr2.length - 1) {
      if (!arr2[pointer2] || arr1[pointer1] < arr2[pointer2]) {
        mergedArr.push(arr1[pointer1])
        pointer1++
      } else {
        mergedArr.push(arr2[pointer2])
        pointer2++
      }
    }

    return mergedArr
  }

  const mergedArr = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
  console.log(mergedArr);
}