import express, { Request, Response } from 'express';
import { Critter } from '@/models/critter';
const router = express.Router();
import { critterTypes } from '@/utils/constants';
import { isAvailableInHour, isAvailableInMonth } from '@/utils/helperFunctions';

router.get('/api/critters', async (req: Request, res: Response) => {
	const critters = await Critter.find({});
	return res.status(200).send(critters);
});

router.get('/api/fish', async (req: Request, res: Response) => {
	const critters = await Critter.find({ critter_type: critterTypes.FISH });
	return res.status(200).send(critters);
});

router.get('/api/bugs', async (req: Request, res: Response) => {
	const critters = await Critter.find({ critter_type: critterTypes.BUG });
	return res.status(200).send(critters);
});

router.get('/api/sea', async (req: Request, res: Response) => {
	const critters = await Critter.find({ critter_type: critterTypes.SEA });
	return res.status(200).send(critters);
});

router.post('/api/critters', async (req: Request, res: Response) => {
	const { name, description } = req.body;

	const createdCritter = Critter.create({ name, description });
	return res.status(201).send(createdCritter);
});

router.get('/api/available', async (req: Request, res: Response) => {
	const { hour, month, hemisphere } = req.body;
	const critters = await Critter.find();
	const availableUeids = critters
		.filter(c => isAvailableInMonth(c, month, hemisphere))
		.map(critter =>
			isAvailableInHour(critter.time || '', hour) ? critter.ueid : null
		)
		.filter(Boolean);
	return res.status(200).send(availableUeids);
});

export { router as critterRouter };
