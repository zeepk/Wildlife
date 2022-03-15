import express, { Request, Response } from 'express';
import { GameEvent, IGameEvent } from '@/models/gameevent';
import {
	getAuthIdFromJwt,
	isNullUndefinedOrWhitespace,
	formatEvent,
} from '@/utils/helperFunctions';
import { Profile } from '@/models/profile';
import { hemispheres } from '@/utils/constants';
const router = express.Router();

router.get('/api/events', async (req: Request, res: Response) => {
	const authId = getAuthIdFromJwt(req.cookies.login_jwt);

	// checking login status because it's okay if not logged in
	const isLoggedIn = !isNullUndefinedOrWhitespace(authId);
	let profile;
	if (isLoggedIn) {
		profile = await Profile.findOne({ authId: authId });
		if (!profile) {
			console.log(`invalid profile authId: ${authId}`);
			return res.sendStatus(404);
		}
	}
	const hemisphere = profile ? profile.hemisphere : hemispheres.NORTHERN;
	const isNorthernHemisphere = hemisphere === hemispheres.NORTHERN;

	const events = await GameEvent.find({});
	const newEvents = events
		.map(e => formatEvent(e, isNorthernHemisphere))
		.filter(e => e);
	const types = [...new Set(newEvents.map(e => e?.type))];

	const resp = {
		count: newEvents.length,
		types,
		newEvents,
	};

	return res.status(200).send(resp);
});

export { router as eventRouter };
