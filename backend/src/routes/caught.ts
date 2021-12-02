import express, { Request, Response } from 'express';
import { Caught } from '@/models/caught';
const router = express.Router();

router.get('/api/caught', async (req: Request, res: Response) => {
	const { userId } = req.body;
	const caught = await Caught.find({ userId });
	return res.status(200).send(caught);
});

router.post('/api/caught', async (req: Request, res: Response) => {
	const { userId, id, ueid, name, critterType } = req.body;

	const createdCaught = await Caught.create({
		userId,
		id,
		ueid,
		name,
		critterType,
		active: true,
	});
	return res.status(201).send(createdCaught);
});

router.delete('/api/caught', async (req: Request, res: Response) => {
	const { userId, id, ueid } = req.body;

	await Caught.deleteOne({ userId, id, ueid });
	return res.status(200).send('Deleted successfully');
});

export { router as caughtRouter };
