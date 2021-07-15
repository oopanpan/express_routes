const bodyParser = require('body-parser');
const express = require('express');
const app = express();

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

//extended is a configuration option that tells body-parser which parsing needs to be used. When extended=false it uses the classic encoding querystring library. When extended=true it uses qs library for parsing.
//! body-parser is deprecated after Node 4.16.0
//? body-parser is now shipped with express
app.use(express.urlencoded({ extended: false }));

// send a view to the client
app.get('/', (req, res, next) => {
	res.sendFile(absolutePath);
});

// send a json to a client
app.get('/json', (req, res, next) => {
	if (process.env.MESSAGE_STYLE === 'uppercase') {
		jsonMessage.message = jsonMessage.message.toUpperCase();
	}
	res.json(jsonMessage);
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
// text took place instead of :word will be found in req.params
app.get('/:word/echo', (req, res) => {
	res.json({ echo: `${req.params.word}` });
});

//Query Params input
//query params format '/name?first=firstname&last=lastname'
app.get('/name', (req, res) => {
	const fullName = `${req.query.first} ${req.query.last}`;
	res.json({ name: fullName });
});

// After parsing query with express.urlencoded() middleware, information is stored in req.body
app.post('/name', (req, res) => {
	const fullName = `${req.body.first} ${req.body.last}`;
	res.json({ name: fullName });
});

module.exports = app;
