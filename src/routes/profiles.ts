import express, { Request, Response } from 'express';
import { Profile } from '@/models/profile';
import { Caught } from '@/models/caught';
import { hemispheres } from '@/utils/constants';
import { Villager } from '@/models/villager';
import { Critter } from '@/models/critter';
import { Mongoose } from 'mongoose';
import { Fossil } from '@/models/fossil';
import { Song } from '@/models/song';
import { Art } from '@/models/art';
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
	const authId = req.params.id;
	const profile = await Profile.findOne({ authId: authId });
	if (!profile) {
		return res.sendStatus(404);
	}
	const caught = await Caught.find({ authId });
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
	const { authId, username, avatarId, hemisphere, hideCaught, islandName } =
		req.body;
	const profile = await Profile.findOne({ authId });
	if (!profile) {
		return res.sendStatus(404);
	}

	// check to see if another profile exists with the new username
	if (username !== profile.username) {
		const otherProfileSameName = await Profile.findOne({ username });
		if (otherProfileSameName) {
			const resp = {
				success: false,
				errorMessage: 'Username taken, please try again.',
				profile,
			};
			return res.status(200).send(resp);
		}
	}

	profile.username = username || profile.username;
	profile.hemisphere = hemisphere || profile.hemisphere;
	profile.hideCaught =
		hideCaught === undefined ? profile.hideCaught : hideCaught;
	profile.islandName = islandName || profile.islandName;

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
	const { authId, id, ueid } = req.body;

	await Profile.deleteOne({ authId, id, ueid });
	return res.status(200).send('Deleted successfully');
});

router.post('/api/profile/import', async (req: Request, res: Response) => {
	const { authId, caughtItems } = req.body;
	const critters = await Critter.find({});
	const fossils = await Fossil.find({});
	const songs = await Song.find({});
	const art = await Art.find({});
	const items = [...critters, ...fossils, ...songs, ...art];
	let numberOfItemsImported = 0;

	await Promise.all(
		caughtItems.map(async (ci) => {
			const ciName = ci
				.toLowerCase()
				.split('_')
				.join(' ')
				.replace('venus', "venus'");
			const item = items.find((i) => i.name.toLowerCase() === ciName);
			if (!item) {
				console.log(`Could not find item with name: ${ciName}`);
				return;
			}
			const existingCaught = await Caught.findOne({ ueid: item.ueid });
			if (existingCaught) {
				return;
			}
			await Caught.create({
				authId,
				ueid: item.ueid,
				critterType: item.critter_type,
				active: true,
			});
			numberOfItemsImported++;
		})
	);
	return res.status(200).send({ imported: numberOfItemsImported });
});

export { router as profileRouter };
