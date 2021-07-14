var express = require('express');
var app = express();

let jsonMessage = {
	message: 'Hello json',
};

const simpleLogger = (req) => {
	return `${req.method.toString()} ${req.path.toString()} - ${req.ip.toString()}`;
};

// static middleware to load a path into the environment
app.use('/public', express.static(__dirname + '/public'));

// global middleware
app.use((req, res, next) => {
	console.log(simpleLogger(req));
	next();
});

// send a view to the client
app.get('/', (req, res, next) => {
	res.sendFile(absolutePath);
});

// time log middleware, chained middle ware to route
app.get(
	'/now',
	(req, res, next) => {
		req.time = new Date().toString();
		next();
	},
	(req, res) => {
		res.json({ time: `${req.time}` });
	}
);

// params capture example
app.get('/:word/echo', (req, res) => {
	res.json({ echo: `${req.params.word}` });
});

// send a json to a client
app.get('/json', (req, res, next) => {
	if (process.env.MESSAGE_STYLE === 'uppercase') {
		jsonMessage.message = jsonMessage.message.toUpperCase();
	}
	res.json(jsonMessage);
});

module.exports = app;
