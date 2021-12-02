import express, { Request, Response } from 'express';
import { Profile } from '@/models/profile';
import { Caught } from '@/models/caught';
import { hemispheres } from '@/utils/constants';
const router = express.Router();

// "given_name": "Matt",
// "family_name": "Hughes",
// "nickname": "mhughes",
// "name": "Matt Hughes",
// "picture": "https://lh3.googleusercontent.com/a-/AOh14GiZ1Omf7_VWi9TfKAqU9Pu3yvaE0wd_uqxpfoNZRQ=s96-c",
// "locale": "en",
// "updated_at": "2021-11-28T23:47:15.868Z",
// "email": "mhughes@mail.com",
// "email_verified": true,
// "sub": "google-oauth2|1234"

router.get('/api/profile/:id', async (req: Request, res: Response) => {
	const userId = req.params.id;
	const profile = await Profile.findOne({ authId: userId });
	if (!profile) {
		return res.sendStatus(404);
	}
	const caught = await Caught.find({ userId });
	const resp = {
		profile,
		caught: caught ? caught : [],
	};
	return res.status(200).send(resp);
});

router.post('/api/profile', async (req: Request, res: Response) => {
	const { authId, username, avatar } = req.body;

	const createdProfile = await Profile.create({
		authId,
		username,
		avatar,
		hemisphere: hemispheres.NORTHERN,
		friends: [],
	});
	return res.status(201).send(createdProfile);
});

router.delete('/api/profile', async (req: Request, res: Response) => {
	const { userId, id, ueid } = req.body;

	await Profile.deleteOne({ userId, id, ueid });
	return res.status(200).send('Deleted successfully');
});

export { router as profileRouter };
