import express, { Request, Response } from 'express';
const router = express.Router();
import { Song } from '@/models/song';

router.get('/api/songs', async (req: Request, res: Response) => {
	const songs = await Song.find({});

	return res.status(200).send(songs);
});

export { router as songRouter };
