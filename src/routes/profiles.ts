import express, { Request, Response } from 'express';
import { Profile } from '@/models/profile';
import { Caught } from '@/models/caught';
import { hemispheres } from '@/utils/constants';
import { Villager } from '@/models/villager';
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
	const { authId, username, avatar, avatarId } = req.body;

	const createdProfile = await Profile.create({
		authId,
		username,
		avatar,
		avatarId,
		hemisphere: hemispheres.NORTHERN,
		friends: [],
	});
	return res.status(201).send(createdProfile);
});

router.put('/api/profile', async (req: Request, res: Response) => {
	// TODO: allow users to change their timezone for fish times, etc
	const { authId, username, avatarId, hemisphere } = req.body;
	const profile = await Profile.findOne({ authId });
	if (!profile) {
		return res.sendStatus(404);
	}
	profile.username = username;
	profile.hemisphere = hemisphere;

	if (avatarId !== profile.avatarId) {
		const villager = await Villager.findOne({ ueid: avatarId });
		if (villager?.ueid) {
			profile.avatar = villager.image_uri;
			profile.avatarId = villager.ueid;
		}
	}

	const updatedProfile = await profile.save();
	const resp = {
		success: Boolean(updatedProfile),
		profile: updatedProfile,
	};
	return res.status(200).send(resp);
});

router.delete('/api/profile', async (req: Request, res: Response) => {
	const { userId, id, ueid } = req.body;

	await Profile.deleteOne({ userId, id, ueid });
	return res.status(200).send('Deleted successfully');
});

export { router as profileRouter };
