import express, { Request, Response } from 'express';
const router = express.Router();
import { Achievement } from '@/models/achievement';

router.get('/api/achievements', async (req: Request, res: Response) => {
	const achievements = await Achievement.find({});

	return res.status(200).send(achievements);
});

export { router as achievementRouter };
