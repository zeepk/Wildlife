import express, { Request, Response } from 'express';
import { Villager } from '@/models/villager';
const router = express.Router();

router.get('/api/villagers', async (req: Request, res: Response) => {
	const villagers = await Villager.find({});
	return res.status(200).send(villagers);
});

export { router as villagerRouter };
