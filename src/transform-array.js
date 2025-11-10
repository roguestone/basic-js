const { NotImplementedError } = require("../lib");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
 if (!Array.isArray(arr)) {
  throw new Error("'arr' parameter must be an instance of the Array!");
 }

 const result = [];
 const discardNextIndexes = new Set();

 for (let i = 0; i < arr.length; i++) {
  const currentItem = arr[i];

  if (discardNextIndexes.has(i)) {
   continue;
  }

  if (currentItem === "--discard-next") {
   if (i + 1 < arr.length) {
    discardNextIndexes.add(i + 1);
   }
  } else if (currentItem === "--discard-prev") {
   if (i - 1 >= 0 && !discardNextIndexes.has(i - 1)) {
    result.pop();
   }
  } else if (currentItem === "--double-next") {
   if (i + 1 < arr.length && !discardNextIndexes.has(i + 1)) {
    result.push(arr[i + 1]);
   }
  } else if (currentItem === "--double-prev") {
   if (i - 1 >= 0 && !discardNextIndexes.has(i - 1)) {
    result.push(arr[i - 1]);
   }
  } else {
   result.push(currentItem);
  }
 }

 return result;
}

module.exports = {
 transform,
};
