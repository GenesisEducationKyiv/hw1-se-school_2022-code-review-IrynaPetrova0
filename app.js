const express = require('express');
const routes = require('./src/routes/index');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

app.use(bodyParser.json());
app.use(multer().array());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.listen('8080', () => {
	console.log('App listening on port 8080');
});