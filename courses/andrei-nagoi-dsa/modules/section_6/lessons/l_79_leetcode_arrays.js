export const l_79_leetcode_arrays = () => {

  const twoSum = (nums, target) => {
    let pointer1 = 0
    let pointer2 = 1
    let foundAnswer = false
    const answer = []
    while (!foundAnswer) {
      if (nums[pointer1] + nums[pointer2] === target && pointer1 !== pointer2) {
        foundAnswer = true
        answer.push(pointer1, pointer2)
      } else if (pointer2 === nums.length - 1) {
        pointer1++
        pointer2 = 0
      } else {
        pointer2++
      }
    }
    return answer
  }

  const maxSubArray = (nums) => {
    if (!nums || nums.length === 0) {
      return 0;
    }
    let maxSum = nums[0];
    let currentSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
      currentSum = Math.max(nums[i], currentSum + nums[i]);
      maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
  };

  const moveZeroes = (nums) => {
    let nonZeroIndex = 0;

    for (let i = 0; i < nums.length; i++) {
      if (nums[i] !== 0) {
        nums[nonZeroIndex] = nums[i];
        nonZeroIndex++;
      }
    }

    for (let i = nonZeroIndex; i < nums.length; i++) {
      nums[i] = 0;
    }

    return nums;
  }

  const rotate = (nums, k) => {
    const result = []
    for (let i = 0; i < k; i++) {
        result[i] = nums[nums.length - k + i]
    }
    for (let j = k; j < nums.length; j++) {
        result[j] = nums[j - k]
    }
    return result;
  }

  console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3))
  console.log(rotate([-1, -100, 3, 99], 2))
}