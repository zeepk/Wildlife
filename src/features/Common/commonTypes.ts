import { DateTime } from 'luxon';
import { critterTypes } from 'utils/constants';

export type AuthDataCreateAccount = {
	authId: string;
	username: string;
	avatar: string;
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
