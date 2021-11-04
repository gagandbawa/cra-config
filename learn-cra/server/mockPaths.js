const path = require('path');
const fs = require('fs');

module.exports = (app) => {
	app.get('/reports/:fileName', (req, res) => {
		const filePath = path.resolve(`public/reports/${req.params.fileName}`);
		res.sendFile(filePath);
	});

	app.route('/someservicename').post((req, res) => {
		const obj = {
			statusCode: 1,
			statusMsg: 'SUCCESS',
		};
		res.json(obj);
	});

	app.route('/movies').get((req, res) => {
		setTimeout(() => {
			const obj = fs.readFileSync(path.resolve('server/json/movies.json'));
			const json = JSON.parse(obj);
			res.json(json);
		}, 300);
	});
	// All new CAAS Services please add inside /server/json/CAAS with same  filename as URL
	app.route('*/services/:fileName').get((req, res) => {
		const obj = fs.readFileSync(
			path.resolve(`server/json/${req.params.fileName}`)
		);
		const json = JSON.parse(obj);
		res.json(json);
	});

	return app;
};
