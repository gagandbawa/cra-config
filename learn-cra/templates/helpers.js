const fs = require('fs');

const getTextFileContent = (filePath) => fs.readFileSync(filePath);
module.exports = { getTextFileContent };
