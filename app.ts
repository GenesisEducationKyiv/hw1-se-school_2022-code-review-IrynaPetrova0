import Config from "./config";
import express from 'express';
import routes from './src/routes';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw())
app.use(multer().array(''));


app.use('/api', routes);

let server = app.listen(Config.PORT, () => {
	console.log('App listening on port ' + Config.PORT);
});

export default server;