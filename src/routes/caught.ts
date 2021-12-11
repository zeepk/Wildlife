import express, { Request, Response } from 'express';
import { Caught } from '@/models/caught';
const router = express.Router();

router.get('/api/caught', async (req: Request, res: Response) => {
	const { authId } = req.body;
	const caught = await Caught.find({ authId });
	return res.status(200).send(caught);
});

router.post('/api/caught', async (req: Request, res: Response) => {
	const { authId, ueid, critterType } = req.body;

	const createdCaught = await Caught.create({
		authId,
		ueid,
		critterType,
		active: true,
	});
	return res.status(201).send(createdCaught);
});

router.delete('/api/caught', async (req: Request, res: Response) => {
	const { authId, ueid } = req.body;

	await Caught.deleteMany({ authId, ueid });
	return res.status(200).send('Deleted successfully');
});

export { router as caughtRouter };
