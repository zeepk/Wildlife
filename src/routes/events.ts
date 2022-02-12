import express, { Request, Response } from 'express';
import { Event } from '@/models/event';
const router = express.Router();

router.get('/api/events', async (req: Request, res: Response) => {
	const events = await Event.find({});
	const types = [...new Set(events.map(e => e.type))];
	const resp = {
		types,
		events,
	};

	return res.status(200).send(resp);
});

export { router as eventRouter };
