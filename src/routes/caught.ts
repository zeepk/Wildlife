import express, { Request, Response } from 'express';
import { Caught } from '@/models/caught';
import { Achievement } from '@/models/achievement';
const router = express.Router();

router.get('/api/caught', async (req: Request, res: Response) => {
	const { authId } = req.body;
	const caught = await Caught.find({ authId });
	return res.status(200).send(caught);
});

router.post('/api/caught', async (req: Request, res: Response) => {
	const { authId, ueid, critterType, value } = req.body;
	const achievement = await Achievement.findOne({ ueid });
	const newCaught = await Caught.create({
		authId,
		ueid,
		critterType,
		value,
		active: true,
	});
	const createdCaught = [newCaught];
	if (value && achievement?.sequential) {
		for (let i = 0; i < value; i++) {
			const sequentialCaught = await Caught.create({
				authId,
				ueid,
				critterType,
				value: i + 1,
				active: true,
			});
			createdCaught.push(sequentialCaught);
		}
	}
	return res.status(201).send(createdCaught);
});

router.delete('/api/caught', async (req: Request, res: Response) => {
	const { authId, ueid, value } = req.body;
	const achievement = await Achievement.findOne({ ueid });
	await Caught.deleteMany({ authId, ueid, value });
	if (achievement?.sequential) {
		await Caught.deleteMany({ authId, ueid });
	}
	return res.status(200).send({
		ueid,
		sequential: achievement?.sequential,
		value,
	});
});

export { router as caughtRouter };
