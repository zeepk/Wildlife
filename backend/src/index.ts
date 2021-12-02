require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { critterRouter } from '@/routes/critters';
import { updateRouter } from '@/routes/update';
import { caughtRouter } from '@/routes/caught';
import { profileRouter } from '@/routes/profiles';
const connectionString = process.env.MONGO_DB_CONN_STRING;

const app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// config express-session
var sess = {
	secret: 'secret',
	cookie: {
		secure: false,
	},
	resave: false,
	saveUninitialized: true,
};

if (app.get('env') === 'production') {
	// Use secure cookies in production (requires SSL/TLS)
	sess.cookie.secure = true;

	// Uncomment the line below if your application is behind a proxy (like on Heroku)
	// or if you're encountering the error message:
	// "Unable to verify authorization request state"
	// app.set('trust proxy', 1);
}

app.use(session(sess));
// Load environment variables from .env
var dotenv = require('dotenv');
dotenv.config();

app.use(json());
app.use(critterRouter);
app.use(updateRouter);
app.use(caughtRouter);
app.use(profileRouter);
if (connectionString) {
	mongoose.connect(connectionString);
}

app.listen(process.env.PORT || 8000, () => {
	console.log('server is listening on port 8000');
});
