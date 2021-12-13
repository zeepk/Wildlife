import express, { Request, Response } from 'express';
const router = express.Router();
import { Art } from '@/models/art';

router.get('/api/art', async (req: Request, res: Response) => {
	const arts = await Art.find({});
	if (arts.some((a) => !a.fake_uri && a.genuine)) {
		await arts.forEach(async (a) => {
			if (a.genuine && !a.fake_uri) {
				const fakeVersion = await Art.findOne({
					name: a.name,
					genuine: false,
				});
				if (fakeVersion) {
					a.fake_uri = fakeVersion.image_uri;
					await a.save();
				}
			}
		});
	}

	const formattedArts = arts.filter((a) => a.genuine);

	return res.status(200).send(formattedArts);
});

export { router as artRouter };
