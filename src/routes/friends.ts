import express, { Request, Response } from 'express';
import { FriendRequest, Profile } from '@/models/profile';
import { ApiResponse } from '@/utils/customTypes';
const router = express.Router();

router.get(
	'/api/friends/friendrequests/:id',
	async (req: Request, res: Response) => {
		const authId = req.params.id;
		const profile = await Profile.findOne({ authId: authId });
		if (!profile) {
			console.log(`invalid profile authId: ${authId}`);
			return res.sendStatus(404);
		}
		const outgoingFriendRequests = await FriendRequest.find({
			requestor: profile,
		});
		const incomingFriendRequests = await FriendRequest.find({
			requestee: profile,
		});
		const resp = {
			outgoingFriendRequests,
			incomingFriendRequests,
			profile,
		};
		return res.status(200).send(resp);
	},
);

router.delete(
	'/api/friends/friendrequest',
	async (req: Request, res: Response) => {
		const { requestId, accepted } = req.body;
		const friendRequest = await FriendRequest.findOne({ _id: requestId });
		if (!friendRequest) {
			console.log(`invalid friend request with id: ${requestId}`);
			return res.sendStatus(404);
		}

		if (accepted) {
			// add the users to each others' friends lists

			const requesteeProfile = await Profile.findOne({
				authId: friendRequest.requestee.authId,
			});
			const requestorProfile = await Profile.findOne({
				authId: friendRequest.requestor.authId,
			});

			if (!requesteeProfile || !requestorProfile) {
				console.log(
					`invalid profile authId: ${friendRequest.requestee.authId} or ${friendRequest.requestor.authId}`,
				);
				return res.sendStatus(404);
			}

			requesteeProfile.friends.push(requestorProfile.authId);
			requestorProfile.friends.push(requesteeProfile.authId);

			await requestorProfile.save();
			await requesteeProfile.save();
		}

		await FriendRequest.deleteOne({ _id: requestId });

		const resp = {
			accepted,
			newFriend: friendRequest.requestor,
		};
		return res.status(200).send(resp);
	},
);

router.post('/api/friends/addfriend', async (req: Request, res: Response) => {
	const { requesteeUsername, requestorAuthId } = req.body;
	const requesteeProfile = await Profile.findOne({
		username: requesteeUsername,
	});
	const requestorProfile = await Profile.findOne({ authId: requestorAuthId });
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
		const errorMessage = `friend request already exists for authId: ${requesteeUsername} and ${requestorAuthId}`;
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
});

export { router as friendsRouter };
