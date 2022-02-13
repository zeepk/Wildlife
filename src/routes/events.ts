import express, { Request, Response } from 'express';
import { GameEvent, IGameEvent } from '@/models/gameevent';
import {
	getAuthIdFromJwt,
	isNullUndefinedOrWhitespace,
} from '@/utils/helperFunctions';
import { Profile } from '@/models/profile';
import { hemispheres, daysArray } from '@/utils/constants';
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
	const types = [...new Set(events.map(e => e.type))];
	const convert = (e: IGameEvent) => {
		let activeDates: any[] = [];
		let activeDateRange: any[] = [];
		if (e.dates_nh === 'NA' && e.dates_sh === 'NA') {
			return;
		}
		if (e.name.includes('hemisphere')) {
			if (e.name.includes('southern') && isNorthernHemisphere) {
				return;
			}
			if (e.name.includes('nothern') && !isNorthernHemisphere) {
				return;
			}
		}

		const year = isNaN(Number(e.year)) ? new Date().getFullYear() : e.year;

		const dateString = (isNorthernHemisphere ? e.dates_nh : e.dates_sh).replace(
			/\u2013/g,
			'-'
		);

		if (dateString.includes('-')) {
			const dates = dateString.split('-');
			const startDate = new Date(`${dates[0].trim()} ${year}`.trim());
			const endDate = new Date(`${dates[1].trim()} ${year}`.trim());
			activeDateRange = [startDate, endDate];
		} else if (dateString.includes(' of ')) {
			const dates = dateString.split(';\n');
			activeDates = dates.map(d => {
				const month = d.split(' of ')[1].trim();
				const dayOffset = Number(d.charAt(0));
				const dayName = d.split(' of ')[0].split(' ')[1].trim().toLowerCase();
				const dayIndex = daysArray.indexOf(dayName);
				const startingDate = new Date(`${month} 1 ${year}`);
				while (startingDate.getDay() <= 31) {
					if (startingDate.getDay() === dayIndex) {
						const dateNumber = startingDate.getDate() + (dayOffset - 1) * 7;
						startingDate.setDate(dateNumber);
						return startingDate;
					}
					startingDate.setDate(startingDate.getDate() + 1);
				}
			});
		} else {
		}
		return {
			name: e.name,
			year: e.year,
			dateString,
			activeDates,
			activeDateRange,
		};
	};

	const newEvents = events.map(e => convert(e)).filter(e => e);

	const resp = {
		newEvents,
		types,
		events,
	};

	return res.status(200).send(resp);
});

export { router as eventRouter };
