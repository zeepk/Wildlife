import { DateTime } from 'luxon';

export type Fish = {
	_id: string;
	name: string;
	ueid: string;
	description: string;
	critterType: number;
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
