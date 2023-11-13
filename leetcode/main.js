let nums = [];

var searchInsert = function (nums, target) {
  let index;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > target) {
      index = i;
      break;
    } else if (nums[i] === target) {
      index = i;
      break;
    } else {
      index = nums.length;
    }
  }
  console.log("target ->", target, "result index ->", index);
  return index;
};

console.log("nums >>>", nums);
searchInsert(nums, 0);
searchInsert(nums, 1);
searchInsert(nums, 2);
searchInsert(nums, 3);
searchInsert(nums, 4);
searchInsert(nums, 5);
searchInsert(nums, 6);
searchInsert(nums, 7);
searchInsert(nums, 8);
searchInsert(nums, 9);
