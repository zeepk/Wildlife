import express, { Request, Response } from 'express';
import { Caught } from '@/models/caught';
const router = express.Router();

router.get('/api/caught', async (req: Request, res: Response) => {
	const { authId } = req.body;
	const caught = await Caught.find({ authId });
	return res.status(200).send(caught);
});

router.post('/api/caught', async (req: Request, res: Response) => {
	const { authId, id, ueid, name, critterType } = req.body;

	const createdCaught = await Caught.create({
		authId,
		id,
		ueid,
		name,
		critterType,
		active: true,
	});
	return res.status(201).send(createdCaught);
});

router.delete('/api/caught', async (req: Request, res: Response) => {
	const { authId, id, ueid } = req.body;

	await Caught.deleteOne({ authId, id, ueid });
	return res.status(200).send('Deleted successfully');
});

export { router as caughtRouter };
