const fs = require('fs');

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (data) {
        resolve(data);
      } else {
        reject(new Error(err));
      }
    });
  });
};

module.exports = { readFile };
