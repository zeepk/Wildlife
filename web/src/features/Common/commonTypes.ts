import { DateTime } from 'luxon';
import { critterTypes, hemispheres } from 'utils/constants';

export type AuthDataCreateAccount = {
	authId: string;
	username: string;
	avatar: string;
	avatarId: number;
};

export type Profile = {
	_id: string;
	authId: string;
	username: string;
	avatar: string;
	avatarId: number;
	friends: Array<string>;
	createdAt: DateTime;
	updatedAt: DateTime;
	hemisphere: hemispheres;
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
