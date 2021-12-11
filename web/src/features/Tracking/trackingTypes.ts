import { DateTime } from 'luxon';
import { critterTypes } from 'utils/constants';

export type Fish = {
	_id: string;
	name: string;
	ueid: string;
	description: string;
	critter_type: critterTypes;
	order: number;
	icon_uri: string;
	image_uri: string;
	bells_sell: number;
	source: string;
	spawn_rates: string;
	catches_to_unlock: number;
	shadow_size: string;
	difficulty: string;
	vision: string;
	northernMonths: string;
	southernMonths: string;
	time: string;
	createdAt: DateTime;
	updatedAt: DateTime;
	__v: any;
};

export type Bug = {
	_id: string;
	name: string;
	ueid: string;
	description: string;
	critter_type: critterTypes;
	order: number;
	icon_uri: string;
	image_uri: string;
	bells_sell: number;
	source: string;
	spawn_rates: string;
	catches_to_unlock: number;
	weather: string;
	northernMonths: string;
	southernMonths: string;
	time: string;
	createdAt: DateTime;
	updatedAt: DateTime;
	__v: any;
};
