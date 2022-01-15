require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import { json } from 'body-parser';
const { auth } = require('express-openid-connect');
var session = require('express-session');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
import { critterRouter } from '@/routes/critters';
import { villagerRouter } from '@/routes/villagers';
import { updateRouter } from '@/routes/update';
import { caughtRouter } from '@/routes/caught';
import { profileRouter } from '@/routes/profiles';
import { friendsRouter } from '@/routes/friends';
import { artRouter } from '@/routes/arts';
import { fossilRouter } from '@/routes/fossils';
import { songRouter } from './routes/songs';
import { reactionRouter } from './routes/reactions';
import { achievementRouter } from './routes/achievements';
const connectionString = process.env.MONGO_DB_CONN_STRING;

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.AUTH0_LOCAL_SECRET,
	baseURL: process.env.API_URL,
	clientID: process.env.AUTH0_CLIENT_ID,
	issuerBaseURL: process.env.AUTH0_DOMAIN,
	clientSecret:
		'as3NQR8ALkhXVPtfKfaUTAIzNXdweuvkR_QW_h-3y8Jqj-t_yHsRcWEkIAGFB4SB',
	authorizationParams: {
		response_type: 'code',
		scope: 'openid profile email read:reports',
		audience: 'https://wildlife/api',
	},
};
const allowedOrigins = [
	process.env.REACT_APP_BASE_URL,
	process.env.API_URL,
	process.env.AUTH0_DOMAIN,
];

const getCORSOrigin = (origin, callback) => {
	if (!origin || allowedOrigins.indexOf(origin) !== -1) {
		callback(null, true);
	} else {
		callback(new Error(`Origin "${origin}" is not allowed by CORS`));
	}
};
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
var cookieParser = require('cookie-parser');
app.set('trust proxy', 1);
app.enable('trust proxy');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: getCORSOrigin, credentials: true }));
app.use(auth(config));
app.use(bodyParser.json());
app.use(json());
dotenv.config();

var sess = {
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
	proxy: true,
	cookie: {
		maxAge: 60 * 60 * 1000,
		sameSite: true,
		httpOnly: true,
		// 2nd change.
		secure: false,
	},
};

if (isProduction) {
	// Use secure cookies in production (requires SSL/TLS)
	// Uncomment the line below if your application is behind a proxy (like on Heroku)
	// or if you're encountering the error message:
	// "Unable to verify authorization request state"
	// app.set('trust proxy', 1);
}
// app.use(session(sess));

app.get('/', (req: any, res: any) => {
	console.log(req.cookies.appSession);
	console.log(req.oidc.isAuthenticated() ? 'logged in' : 'logged out');
	// res.cookie('appSession', req.cookies.appSession);
	res.cookie('test', 'testing1');
	res.cookie('appSession', req.cookies.appSession, {
		domain: '.acwildlife.com',
		path: '/',
		secure: true,
	});
	res.redirect(
		process.env.REACT_APP_BASE_URL + '/login/' + req.cookies.appSession || '',
	);
});
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
app.use(friendsRouter);

if (connectionString) {
	mongoose.connect(connectionString);
}

if (true) {
	app.listen(process.env.PORT || 8000, () => {
		console.log('server is listening on port 8000');
	});
} else {
	https
		.createServer(
			{
				key: fs.readFileSync('server.key'),
				cert: fs.readFileSync('server.cert'),
			},
			app,
		)
		.listen(8000, function () {
			console.log('server is listening securely (https) on port 8000');
		});
}
