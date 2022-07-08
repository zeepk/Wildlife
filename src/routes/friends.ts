import express, { Request, Response } from 'express';
import { FriendRequest, Profile } from '@/models/profile';
import { ApiResponse } from '@/utils/customTypes';
import { getAuthIdFromJwt } from '@/utils/helperFunctions';
import { Caught } from '@/models/caught';
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

router.post('/api/friends/requests', async (req: Request, res: Response) => {
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
        { authId: 0 }
    );
    if (accepted) {
        // add the users to each others' friends lists

        const requesteeProfile = await Profile.findOne(
            {
                _id: friendRequest.requestee._id,
            },
            { authId: 0 }
        );

        if (!requesteeProfile || !requestorProfile) {
            console.log(
                `invalid profile authId: ${friendRequest.requestee.authId} or ${friendRequest.requestor.authId}`
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
                username: {
                    $regex: new RegExp('^' + requesteeUsername + '$', 'i'),
                },
            },
            { authId: 0, friends: 0 }
        );
        const requestorProfile = await Profile.findOne(
            { authId: requestorAuthId },
            { authId: 0 }
        );
        const resp: ApiResponse = {
            success: true,
            message: '',
            data: null,
        };
        if (!requesteeProfile || !requestorProfile) {
            const errorMessage = `invalid profile authId: ${requesteeUsername} or ${requestorAuthId}`;
            console.log(errorMessage);
            console.log('requestee: ', requesteeProfile);
            console.log('requestor: ', requestorProfile);
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
    }
);

router.post(
    '/api/friends/remove/:username',
    async (req: Request, res: Response) => {
        const requestorAuthId = getAuthIdFromJwt(req.cookies.login_jwt);
        const requesteeUsername = req.params.username;

        const requesteeProfile = await Profile.findOne(
            {
                username: requesteeUsername,
            },
            { authId: 0 }
        );
        const requestorProfile = await Profile.findOne(
            { authId: requestorAuthId },
            { authId: 0 }
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

        if (!requesteeProfile || !requestorProfile) {
            console.log(
                `invalid profile username: ${requesteeUsername} or ${requestorAuthId}`
            );
            return res.sendStatus(404);
        }

        requesteeProfile.friends = requesteeProfile.friends.filter(
            fid => fid.toString() !== requestorProfile._id.toString()
        );
        requestorProfile.friends = requestorProfile.friends.filter(
            fid => fid.toString() !== requesteeProfile._id.toString()
        );

        await requestorProfile.save();
        await requesteeProfile.save();

        const isStillFriend = requestorProfile.friends.includes(
            requesteeProfile._id.toString()
        );

        if (isStillFriend) {
            const errorMessage = 'unable to remove friend';
            console.log(errorMessage);
            resp.success = false;
            resp.message = errorMessage;
            return res.status(500).send(resp);
        }

        resp.data = requesteeProfile.username;
        resp.message = `removed ${requesteeProfile.username} from friends list`;
        return res.status(200).send(resp);
    }
);

router.get('/api/friends/caught/:ueid', async (req: Request, res: Response) => {
    const ueid = req.params.ueid;
    const authId = getAuthIdFromJwt(req.cookies.login_jwt);
    const profile = await Profile.findOne({ authId: authId });
    const resp: ApiResponse = {
        success: true,
        message: '',
        data: [],
        // list of usernames who have caught this item
    };
    if (!profile) {
        console.log(`invalid profile authId: ${authId}`);
        return res.sendStatus(404);
    }
    if (profile.friends.length === 0) {
        resp.message = 'no friends';
        return res.status(200).send(resp);
    }

    const [friendProfiles, caughtForItem] = await Promise.all([
        Profile.find(
            {
                _id: { $in: profile.friends },
            },
            { _id: 0, friends: 0 }
        ),
        Caught.find({ ueid: ueid }),
    ]);

    const caughtUsernames = caughtForItem
        .map(c => friendProfiles.find(fp => fp.authId === c.authId)?.username)
        .filter(u => u);

    resp.data = caughtUsernames;

    return res.status(200).send(resp);
});

export { router as friendsRouter };
