const fs = require("fs");

const copySyncFile = () => {
  // takes file1.txt inside files folder and copies it with name file2.txt
  fs.copyFileSync("./files/file1.txt", "./files/file2.txt");
};

module.exports = {
  copySyncFile,
};
