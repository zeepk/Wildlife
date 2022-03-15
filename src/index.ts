require('dotenv').config();
import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import { json } from 'body-parser';
const { auth } = require('express-openid-connect');
var jwt = require('jsonwebtoken');
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
import { eventRouter } from './routes/events';
const connectionString = process.env.MONGO_DB_CONN_STRING;
const jwtSecret = process.env.JWT_SECRET;

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.AUTH0_LOCAL_SECRET,
	baseURL: process.env.API_URL,
	clientID: process.env.AUTH0_CLIENT_ID,
	issuerBaseURL: process.env.AUTH0_DOMAIN,
	clientSecret: process.env.AUTH0_CLIENT_SECRET,
	authorizationParams: {
		response_type: 'code',
		scope: 'openid profile email read:reports',
		audience: process.env.AUTH0_CLIENT_AUDIENCE,
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
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: getCORSOrigin, credentials: true }));
app.use(auth(config));
app.use(bodyParser.json());
app.use(json());
dotenv.config();

app.get('/', async (req: any, res: any) => {
	// console.log(req.cookies.appSession);
	try {
		const isLoggedIn = req.oidc?.isAuthenticated();
		console.log(isLoggedIn ? 'logged in' : 'logged out');
		if (isLoggedIn) {
			const userInfo = await req.oidc.fetchUserInfo();
			const token = jwt.sign({ authId: userInfo.sub }, jwtSecret);
			// res.cookie('login_jwt', token, {
			// 	domain: 'www.acwildlife.dev',
			// 	sameSite: 'none',
			// 	path: '/',
			// 	secure: true,
			// });
			res.cookie('login_jwt', token, {
				domain: 'www.acwildlife.dev',
				sameSite: 'none',
				path: '/',
				secure: true,
			});
			res.redirect(`${process.env.REACT_APP_BASE_URL}/login/${token}`);
		} else {
			res.cookie('login_jwt', '', {
				domain: 'www.acwildlife.dev',
				sameSite: 'none',
				path: '/',
				secure: true,
			});
			res.redirect(process.env.REACT_APP_BASE_URL);
		}
	} catch (error) {
		console.log('error with auth redirect to /');
		console.log(error);
		res.redirect(process.env.REACT_APP_BASE_URL);
	}
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
app.use(eventRouter);

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
			app
		)
		.listen(8000, function () {
			console.log('server is listening securely (https) on port 8000');
		});
}
