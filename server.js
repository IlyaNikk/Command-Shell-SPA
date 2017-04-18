'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cmd = require('node-cmd');

const database = [];

const app = express();
app.use(bodyParser.json());

app.use('/', express.static('dist'));
app.use('/enter', express.static('dist'));

app.post('/perform', function (req, res) {
	const request = req.body;
	const i = database.length;
	let time = new Date();
	database[i] = {
		command: request.command,
		comment: request.comment,
		status: 'In progress',
		ltime: Date().toString()
	};
	cmd.get(
		request.command,
		function (data, err, stderr) {
			time = new Date();
			database[i].ftime = Date().toString();
			if (stderr) {
				database[i].status = 'Failed';
				database[i].result = stderr;
				res.send(database[i]);
			} else {
				database[i].status = 'Completed';
				database[i].result = data;
				res.send(database[i]);
			}
		}
	);
});

app.get('/result', function (req, res) {
	res.send(database);
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
