const { NotImplementedError } = require("../lib");

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
 const result = [];
 const nameCount = {};

 for (const originalName of names) {
  let currentName = originalName;

  while (nameCount[currentName]) {
   const count = nameCount[currentName];
   currentName = `${originalName}(${count})`;
   nameCount[originalName] = count + 1;
  }

  result.push(currentName);
  nameCount[currentName] = 1;

  if (currentName !== originalName) {
   nameCount[originalName] = (nameCount[originalName] || 1) + 1;
  } else {
   nameCount[originalName] = (nameCount[originalName] || 0) + 1;
  }
 }

 return result;
}

module.exports = {
 renameFiles,
};
