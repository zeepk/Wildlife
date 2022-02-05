import express, { Request, Response } from 'express';
import { Villager } from '@/models/villager';
const router = express.Router();

router.get('/api/villagers', async (req: Request, res: Response) => {
	const villagers = await Villager.find({});
	const species = [...new Set(villagers.map(v => v.species))];
	const personalities = [...new Set(villagers.map(v => v.personality))];
	const resp = {
		villagers,
		species,
		personalities,
	};
	return res.status(200).send(resp);
});

export { router as villagerRouter };
