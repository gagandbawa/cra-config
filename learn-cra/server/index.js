const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = require('./port');
const logger = require('./logger');
const argv = require('./argv');
const setupPaths = require('./mockPaths');
// const setupProxy = require('./enviromentProxy');
// const paths = require('../config/paths');

const compression = require('compression');
const path = require('path');
const cwd = process.cwd();

const app = express();

const [type, version] = process.argv.slice(2) || [];

const customHost = argv.host || process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const corsOptionsDelegate = function (req, callback) {
	let corsOptions = {};
	if (req.url.includes('/paymentservice/')) {
		corsOptions.credentials = true;
		corsOptions.origin = req.get('origin');
	}
	callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Reverse Proxy to QA Environments
// setupProxy(app, type, version);

// Routing for Build Testing
app.use('/', express.static(path.join(cwd, 'build')));

// Mock JSON Routing
setupPaths(app, type, version);

app.listen(port, 'localhost', async (err) => {
	if (err) {
		return logger.error(err.message);
	}
	logger.appStarted(port, prettyHost);
	return null;
});
