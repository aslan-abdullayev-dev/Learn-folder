const getFixedSubsets = (nums) => {
  const path = [];
  const res = [];

  const backtrack = (index) => {
    res.push([...path]);

    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);

  return res;
}

console.log("getFixedSubsets([1, 2]); ==>", getFixedSubsets([1, 2, 3, 4, 5]));

