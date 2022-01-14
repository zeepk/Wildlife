require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { critterRouter } from '@/routes/critters';
import { villagerRouter } from '@/routes/villagers';
import { updateRouter } from '@/routes/update';
import { caughtRouter } from '@/routes/caught';
import { profileRouter } from '@/routes/profiles';
import { artRouter } from '@/routes/arts';
import { fossilRouter } from '@/routes/fossils';
import { songRouter } from './routes/songs';
import { reactionRouter } from './routes/reactions';
import { achievementRouter } from './routes/achievements';
const connectionString = process.env.MONGO_DB_CONN_STRING;
const { auth } = require('express-openid-connect');
var cookieParser = require('cookie-parser');

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.AUTH0_LOCAL_SECRET,
	// TODO: set baseURL to env var
	baseURL: 'http://localhost:8000',
	clientID: process.env.AUTH0_CLIENT_ID,
	issuerBaseURL: 'https://dev-07z65uyo.us.auth0.com',
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
const app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(auth(config));
app.use(cookieParser());
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
app.get('/', (req: any, res) => {
	console.log(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
	console.log(req.oidc.accessToken);
	//TODO: figure out where to redirect, maybe access the origin url
	res.redirect(process.env.REACT_APP_BASE_URL || '');
});

app.use(json());
app.use(critterRouter);
app.use(villagerRouter);
app.use(updateRouter);
app.use(caughtRouter);
app.use(profileRouter);
app.use(artRouter);
app.use(fossilRouter);
app.use(songRouter);
app.use(reactionRouter);
app.use(achievementRouter);
if (connectionString) {
	mongoose.connect(connectionString);
}

app.listen(process.env.PORT || 8000, () => {
	console.log('server is listening on port 8000');
});
