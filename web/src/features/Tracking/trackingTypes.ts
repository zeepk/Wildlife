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

export type Sea = {
	_id: string;
	name: string;
	ueid: string;
	description: string;
	critter_type: critterTypes;
	order: number;
	icon_uri: string;
	image_uri: string;
	bells_sell: number;
	shadow_size: string;
	speed: string;
	catches_to_unlock: number;
	spawn_rates: string;
	northernMonths: string;
	southernMonths: string;
	time: string;
	createdAt: DateTime;
	updatedAt: DateTime;
	__v: any;
};

export type Fossil = {
	_id: string;
	critter_type: critterTypes;
	name: string;
	ueid: string;
	image_uri: string;
	bells_sell: number;
	__v: any;
};

export type Art = {
	_id: string;
	critter_type: critterTypes;
	name: string;
	ueid: string;
	icon_uri: string;
	image_uri: string;
	genuine: boolean;
	fake_uri: string;
	__v: any;
};

export type Music = {
	_id: string;
	critter_type: critterTypes;
	name: string;
	ueid: string;
	image_uri: string;
	source: string;
	source_notes: string;
	__v: any;
};

export type Reaction = {
	_id: string;
	critter_type: critterTypes;
	name: string;
	order: number;
	ueid: string;
	image_uri: string;
	source: string;
	source_notes: string;
	event: string;
	exclusive: boolean;
	__v: any;
};

export type Achievement = {};
