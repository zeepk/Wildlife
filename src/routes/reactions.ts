import express, { Request, Response } from 'express';
const router = express.Router();
import { Reaction } from '@/models/reaction';

router.get('/api/reactions', async (req: Request, res: Response) => {
	const reactions = await Reaction.find({});

	return res.status(200).send(reactions);
});

export { router as reactionRouter };
