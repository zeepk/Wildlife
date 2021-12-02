import { DateTime } from 'luxon';
import { critterTypes } from 'utils/constants';

export type AuthDataCreateAccount = {
	authId: string;
	username: string;
	avatar: string;
};

export type Profile = {
	_id: string;
	authId: string;
	username: string;
	avatar: string;
	friends: Array<string>;
	createdAt: DateTime;
	updatedAt: DateTime;
	// TODO: add to server
	isNorthernHemisphere: boolean;
	__v: any;
};

export type Caught = {
	_id: string;
	id: string;
	userId: string;
	ueid: string;
	name: string;
	active: boolean;
	critterType: critterTypes;
	createdAt: DateTime;
	updatedAt: DateTime;
	__v: any;
};
