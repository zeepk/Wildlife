import express, { Request, Response } from 'express';
import { FriendRequest, Profile } from '@/models/profile';
import { ApiResponse } from '@/utils/customTypes';
import { getAuthIdFromJwt } from '@/utils/helperFunctions';
const router = express.Router();

router.get('/api/friends/requests/:id', async (req: Request, res: Response) => {
	const authId = req.params.id;
	const profile = await Profile.findOne({ authId: authId });
	if (!profile) {
		console.log(`invalid profile authId: ${authId}`);
		return res.sendStatus(404);
	}
	const outgoingFriendRequests = await FriendRequest.find({
		'requestor._id': profile._id,
	});
	const incomingFriendRequests = await FriendRequest.find({
		'requestee._id': profile._id,
	});
	const resp = {
		outgoingFriendRequests,
		incomingFriendRequests,
		profile,
	};
	return res.status(200).send(resp);
});

router.delete('/api/friends/requests', async (req: Request, res: Response) => {
	const { requestId, accepted } = req.body;
	const friendRequest = await FriendRequest.findOne({ _id: requestId });
	if (!friendRequest) {
		console.log(`invalid friend request with id: ${requestId}`);
		return res.sendStatus(404);
	}

	const requestorProfile = await Profile.findOne(
		{
			_id: friendRequest.requestor._id,
		},
		{ authId: 0 },
	);
	if (accepted) {
		// add the users to each others' friends lists

		const requesteeProfile = await Profile.findOne(
			{
				_id: friendRequest.requestee._id,
			},
			{ authId: 0 },
		);

		if (!requesteeProfile || !requestorProfile) {
			console.log(
				`invalid profile authId: ${friendRequest.requestee.authId} or ${friendRequest.requestor.authId}`,
			);
			return res.sendStatus(404);
		}

		requesteeProfile.friends.push(requestorProfile._id);
		requestorProfile.friends.push(requesteeProfile._id);

		await requestorProfile.save();
		await requesteeProfile.save();
	}

	await FriendRequest.deleteOne({ _id: requestId });
	if (requestorProfile) {
		requestorProfile.friends = [];
	}
	const resp = {
		accepted,
		newFriend: requestorProfile,
	};
	return res.status(200).send(resp);
});

router.post(
	'/api/friends/add/:username',
	async (req: Request, res: Response) => {
		const requestorAuthId = getAuthIdFromJwt(req.cookies.login_jwt);
		const requesteeUsername = req.params.username;

		const requesteeProfile = await Profile.findOne(
			{
				username: requesteeUsername,
			},
			{ authId: 0, friends: 0 },
		);
		const requestorProfile = await Profile.findOne(
			{ authId: requestorAuthId },
			{ authId: 0 },
		);
		const resp: ApiResponse = {
			success: true,
			message: '',
			data: null,
		};
		if (!requesteeProfile || !requestorProfile) {
			const errorMessage = `invalid profile authId: ${requesteeUsername} or ${requestorAuthId}`;
			console.log(errorMessage);
			resp.success = false;
			resp.message = errorMessage;
			return res.status(404).send(resp);
		}

		const exists = await FriendRequest.findOne({
			requestor: requestorProfile,
			requestee: requesteeProfile,
		});

		if (exists) {
			const errorMessage = `friend request already exists for username: ${requesteeUsername} and authId: ${requestorAuthId}`;
			console.log(errorMessage);
			resp.success = false;
			resp.message = errorMessage;
			return res.status(400).send(resp);
		}

		const friendRequest = await FriendRequest.create({
			requestor: requestorProfile,
			requestee: requesteeProfile,
		});
		resp.data = friendRequest;

		return res.status(200).send(resp);
	},
);

export { router as friendsRouter };
