import express, { Request, Response } from 'express';
var ObjectID = require('mongodb').ObjectID;
import { FriendRequest, Profile } from '@/models/profile';
import { Caught } from '@/models/caught';
import {
	critterTypes,
	hemispheres,
	includedInTotals,
	totals,
} from '@/utils/constants';
import { Villager } from '@/models/villager';
import { Critter } from '@/models/critter';
import { Fossil } from '@/models/fossil';
import { Song } from '@/models/song';
import { Art } from '@/models/art';
import { ApiResponse } from '@/utils/customTypes';
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
		console.log(`invalid profile authId: ${authId}`);
		return res.sendStatus(404);
	}
	const caught = await Caught.find({ authId });
	const friendProfiles = await Profile.find(
		{
			_id: { $in: profile.friends },
		},
		{ _id: 0, authId: 0, friends: 0 },
	);
	const resp = {
		profile,
		caught: caught ? caught : [],
		friendProfiles: friendProfiles ? friendProfiles : [],
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
		console.log(`invalid profile authId: ${authId}`);
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
		}),
	);
	return res.status(200).send({ imported: numberOfItemsImported });
});

router.get('/api/profile/totals/:id', async (req: Request, res: Response) => {
	const authId = req.params.id;
	const profile = await Profile.findOne({ authId: authId });
	if (!profile) {
		console.log(`invalid profile authId: ${authId}`);
		return res.sendStatus(404);
	}
	const caught = await Caught.find({ authId });
	const totalResponses = includedInTotals.map((inc) => {
		const doneSet =
			inc === critterTypes.ACHIEVEMENT
				? [
						...new Set(
							caught
								.filter((c) => c.critterType === inc && c.value)
								.map((c) => `${c.ueid}${c.value}`),
						),
				  ]
				: [
						...new Set(
							caught.filter((c) => c.critterType === inc).map((c) => c.ueid),
						),
				  ];

		const total = totals[inc];
		const done = doneSet.length;
		return {
			critterType: inc,
			done,
			total,
			percentage: Math.floor((done / total) * 100),
		};
	});
	const overallDone = totalResponses.reduce(function (a, b) {
		return a + b.done;
	}, 0);
	const overallTotal = totalResponses.reduce(function (a, b) {
		return a + b.total;
	}, 0);

	const resp = {
		profile,
		overall: {
			done: overallDone,
			total: overallTotal,
			percentage: Math.floor((overallDone / overallTotal) * 100),
		},
		totals: totalResponses,
	};
	return res.status(200).send(resp);
});

router.post('/api/profilesearch', async (req: Request, res: Response) => {
	const { profileId, username } = req.body;
	const profile = await Profile.findOne(
		{ username: username },
		{ authId: 0, friends: 0 },
	);
	const resp: ApiResponse = {
		success: true,
		message: '',
		data: null,
	};
	if (!profile) {
		const message = `invalid profile for username: ${username}`;
		console.log(message);
		resp.success = false;
		resp.message = message;
		return res.status(404).send(resp);
	}
	const foundUserProfileId = profile._id;
	// profileId = that of the user doing the searching
	// profile = the user being searched for

	const [existingIncomingFriendRequest, existingOutgoingFriendRequest] =
		await Promise.all([
			FriendRequest.findOne({
				'requestor._id': foundUserProfileId,
				'requestee._id': new ObjectID(profileId),
			}),
			FriendRequest.findOne({
				'requestee._id': foundUserProfileId,
				'requestor._id': new ObjectID(profileId),
			}),
		]);

	const respData = {
		existingIncoming: existingIncomingFriendRequest?._id || null,
		existingOutgoing: existingOutgoingFriendRequest?._id || null,
		isMe: foundUserProfileId.toString() === profileId,
		profile,
	};

	resp.data = respData;

	return res.status(200).send(resp);
});
export { router as profileRouter };
