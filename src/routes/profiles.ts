import express, { Request, response, Response } from 'express';
var ObjectID = require('mongodb').ObjectID;
import { FriendRequest, Profile } from '@/models/profile';
import { Caught } from '@/models/caught';
import {
    critterTypes,
    hemispheres,
    includedInTotals,
    totals,
    villagerBirthdayDayRange,
} from '@/utils/constants';
import { Villager, IVillager } from '@/models/villager';
import { Critter } from '@/models/critter';
import { Fossil } from '@/models/fossil';
import { Song } from '@/models/song';
import { Art } from '@/models/art';
import { ApiResponse, ProfileResponse } from '@/utils/customTypes';
import {
    formatEvent,
    getAuthIdFromJwt,
    isAvailableInHour,
    isAvailableInMonth,
    isNullUndefinedOrWhitespace,
} from '@/utils/helperFunctions';
import { GameEvent } from '@/models/gameevent';
const router = express.Router();

router.get('/api/profile', async (req: any, res: Response) => {
    const authId = getAuthIdFromJwt(req.cookies.login_jwt);
    const data: ProfileResponse = {
        isLoggedIn: true,
        profile: null,
        caught: null,
        friendProfiles: null,
        tempAuthId: null,
    };
    const resp: ApiResponse = {
        success: true,
        data: data,
        message: '',
    };
    if (!authId) {
        // not logged in
        const message = 'User not authenticated';
        resp.message = message;
        resp.data.isLoggedIn = false;
        return res.status(200).send(resp);
    }
    const profile = await Profile.findOne({ authId: authId });
    if (!profile) {
        const message = `invalid profile for authId: ${authId}`;
        resp.message = message;
        resp.data.tempAuthId = authId;
        return res.status(200).send(resp);
    }
    const caught = await Caught.find({ authId });
    const friendProfiles = await Profile.find(
        {
            _id: { $in: profile.friends },
        },
        { _id: 0, authId: 0, friends: 0 }
    );
    resp.data = {
        isLoggedIn: true,
        profile,
        caught: caught ? caught : [],
        friendProfiles: friendProfiles ? friendProfiles : [],
        tempAuthId: null,
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
    const {
        authId,
        username,
        avatarId,
        hemisphere,
        hideCaught,
        islandName,
        villagers,
    } = req.body;
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

    // explicit check here because setting hemisphere to zero invokes falsey value
    profile.hemisphere =
        hemisphere === null || hemisphere === undefined
            ? profile.hemisphere
            : hemisphere;

    profile.hideCaught =
        hideCaught === undefined ? profile.hideCaught : hideCaught;
    profile.islandName = islandName || profile.islandName;
    if (villagers) {
        const sortedVillagers = villagers.sort((a, b) =>
            a === null ? 1 : b === null ? -1 : a - b
        );
        profile.villagers = sortedVillagers;
    }

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
        caughtItems.map(async ci => {
            const ciName = ci
                .toLowerCase()
                .split('_')
                .join(' ')
                .replace('venus', "venus'");
            const item = items.find(i => i.name.toLowerCase() === ciName);
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

router.get('/api/profile/totals', async (req: Request, res: Response) => {
    const authId = getAuthIdFromJwt(req.cookies.login_jwt);

    const profile = await Profile.findOne({ authId: authId });
    if (!profile) {
        console.log(`invalid profile authId: ${authId}`);
        return res.sendStatus(404);
    }
    const caught = await Caught.find({ authId });
    const art = await Art.find();
    // TODO: pull in art array, only count genuine items
    const totalResponses = includedInTotals.map(inc => {
        let doneSet: string[] = [];
        if (inc === critterTypes.ACHIEVEMENT) {
            doneSet = [
                ...new Set(
                    caught
                        .filter(c => c.critterType === inc && c.value)
                        .map(c => `${c.ueid}${c.value}`)
                ),
            ];
        } else if (inc === critterTypes.ART) {
            doneSet = [
                ...new Set(
                    caught
                        .filter(
                            c =>
                                c.critterType === inc &&
                                art.find(a => a.ueid === c.ueid)?.genuine
                        )
                        .map(c => c.ueid)
                ),
            ];
        } else {
            doneSet = [
                ...new Set(
                    caught.filter(c => c.critterType === inc).map(c => c.ueid)
                ),
            ];
        }

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
    const [profile, loggedInUser] = await Promise.all([
        await Profile.findOne(
            { username: { $regex: new RegExp('^' + username + '$', 'i') } },
            { authId: 0, friends: 0 }
        ),
        await Profile.findOne({ _id: profileId }),
    ]);
    const resp: ApiResponse = {
        success: true,
        message: '',
        data: null,
    };
    if (!profile) {
        const message = `profile not found for username: ${username}`;
        console.log(message);
        resp.success = false;
        resp.message = message;
        return res.status(200).send(resp);
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

    const alreadyFriends = loggedInUser?.friends.includes(
        new ObjectID(foundUserProfileId)
    );

    const respData = {
        existingIncoming: existingIncomingFriendRequest?._id || null,
        existingOutgoing: existingOutgoingFriendRequest?._id || null,
        isMe: foundUserProfileId.toString() === profileId,
        profile,
        alreadyFriends,
    };

    resp.data = respData;

    return res.status(200).send(resp);
});

router.post('/api/today', async (req: Request, res: Response) => {
    const { hour, month } = req.body;
    const authId = getAuthIdFromJwt(req.cookies.login_jwt);

    // checking login status because it's okay if not logged in
    const isLoggedIn = !isNullUndefinedOrWhitespace(authId);
    let profile;
    if (isLoggedIn) {
        profile = await Profile.findOne({ authId: authId });
        if (!profile) {
            console.log(`invalid profile authId: ${authId}`);
        }
    }
    const hemisphere = profile ? profile.hemisphere : hemispheres.NORTHERN;
    const isNorthernHemisphere = hemisphere === hemispheres.NORTHERN;

    const resp: ApiResponse = {
        success: true,
        message: '',
        data: null,
    };

    const [critters, caught, villagers] = await Promise.all([
        Critter.find(),
        Caught.find({ authId }),
        Villager.find(),
    ]);
    const caughtUeids = caught.map(c => c.ueid);

    const availableCritters = critters.filter(
        c =>
            isAvailableInMonth(
                c,
                month,
                profile?.hemisphere || hemispheres.NORTHERN
            ) &&
            isAvailableInHour(c.time || '', hour) &&
            (isLoggedIn ? !caughtUeids.includes(c.ueid) : true)
    );

    const today = new Date();
    const xDaysFromNow = new Date();
    xDaysFromNow.setDate(today.getDate() + villagerBirthdayDayRange);

    const todaysBirthdays: Array<IVillager> = [];
    const upcomingBirthdays = villagers
        .filter(v => {
            const birthday = new Date(
                `${v.birthday}/${today.getFullYear()} 23:59:59`
            );
            if (
                today.getDate() === birthday.getDate() &&
                today.getMonth() === birthday.getMonth()
            ) {
                todaysBirthdays.push(v);
            }
            return birthday >= today && birthday <= xDaysFromNow;
        })
        .sort((a, b) => a.birthday.localeCompare(b.birthday));

    const events = await GameEvent.find({});
    const todaysEvents = events
        .map(e => formatEvent(e, isNorthernHemisphere))
        .map(e => {
            if (!e) {
                return;
            }
            if (e.activeDateRange.length > 0) {
                return {
                    title: e.name,
                    startDate: new Date(e.activeDateRange[0]),
                    endDate: new Date(e.activeDateRange[1]),
                };
            } else {
                return {
                    title: e.name,
                    startDate: new Date(e.activeDates[0]),
                    endDate: null,
                };
            }
        })
        .filter((e, i) => i > -1 && e !== undefined)
        .filter(e => {
            if (!e?.startDate || !e?.endDate) {
                return false;
            }
            if (
                e?.startDate.getDate() === today.getDate() &&
                e?.startDate.getMonth() === today.getMonth()
            ) {
                return true;
            }
            if (e?.startDate <= today && e?.endDate >= today) {
                return true;
            }
        })
        .map(e => ({ name: e?.title, endDate: e?.endDate }));

    resp.data = {
        todaysBirthdays,
        todaysEvents,
        upcomingBirthdays,
        availableCritters,
    };
    return res.status(200).send(resp);
});

export { router as profileRouter };
