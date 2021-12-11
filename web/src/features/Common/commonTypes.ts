import { DateTime } from 'luxon';
import { critterTypes, hemispheres } from 'utils/constants';

export type AuthDataCreateAccount = {
	authId: string;
	username: string;
	avatar: string;
	avatarId: string;
};

export type AuthDataUpdateProfile = {
	authId: string;
	username: string;
	avatarId: string;
	hemisphere: hemispheres;
};

export type Profile = {
	_id: string;
	authId: string;
	username: string;
	avatar: string;
	avatarId: string;
	friends: Array<string>;
	createdAt: DateTime;
	updatedAt: DateTime;
	hemisphere: hemispheres;
	__v: any;
};

export type Caught = {
	_id: string;
	authId: string;
	ueid: string;
	active: boolean;
	critterType: critterTypes;
	createdAt: DateTime;
	updatedAt: DateTime;
	__v: any;
};

export type Villager = {
	_id: string;
	name: string;
	icon_uri: string;
	image_uri: string;
	species: string;
	gender: string;
	personality: string;
	birthday: string;
	createdAt: DateTime;
	updatedAt: DateTime;
	ueid: string;
	__v: any;
};

export type UpdateCaughtPayload = {
	authId: string;
	ueid: string;
	critterType?: critterTypes;
};
