import express, { Request, Response } from 'express';
const router = express.Router();
import { Fossil } from '@/models/fossil';

router.get('/api/fossils', async (req: Request, res: Response) => {
	const fossils = await Fossil.find({});

	return res.status(200).send(fossils);
});

export { router as fossilRouter };
