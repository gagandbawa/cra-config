const path = require('path');

const { getTextFileContent } = require('../helpers');

const getHTML = (fileName) =>
	getTextFileContent(path.join(__dirname, fileName));

const getLoader = (page) => {
	switch (page) {
		case 'something':
			return getHTML('something.html');
		default:
			return '';
	}
};

module.exports = getLoader;
