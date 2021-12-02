import { Document, Schema, model, Number } from 'mongoose';
import { critterTypes } from '@/utils/constants';
export interface ICritter extends Document {
	name: string;
	ueid: string;
	description: string;
	critterType: number | undefined;
	order: number;
	icon_uri: string;
	image_uri: string;
	bells_sell: number;
	source: string;
	spawn_rates: string;
	catches_to_unlock: number;

	// only for fish & sea creatures
	shadow_size: string | undefined;

	// only for sea creatures
	speed: string | undefined;

	// only for fish
	difficulty: string | undefined;
	vision: string | undefined;

	// only for bugs
	weather: string | undefined;

	nh_jan: string | undefined;
	nh_feb: string | undefined;
	nh_mar: string | undefined;
	nh_apr: string | undefined;
	nh_may: string | undefined;
	nh_jun: string | undefined;
	nh_jul: string | undefined;
	nh_aug: string | undefined;
	nh_sep: string | undefined;
	nh_oct: string | undefined;
	nh_nov: string | undefined;
	nh_dec: string | undefined;

	sh_jan: string | undefined;
	sh_feb: string | undefined;
	sh_mar: string | undefined;
	sh_apr: string | undefined;
	sh_may: string | undefined;
	sh_jun: string | undefined;
	sh_jul: string | undefined;
	sh_aug: string | undefined;
	sh_sep: string | undefined;
	sh_oct: string | undefined;
	sh_nov: string | undefined;
	sh_dec: string | undefined;
}

const CritterSchema = new Schema<ICritter>(
	{
		name: String,
		ueid: String,
		description: String,
		critterType: {
			type: Number,
			enum: critterTypes,
			default: critterTypes.FISH,
		},
		order: Number,
		icon_uri: String,
		image_uri: String,
		bells_sell: Number,
		source: String,
		spawn_rates: String,
		catches_to_unlock: Number,

		// only for fish & sea creatures
		shadow_size: String,

		// only for sea creatures
		speed: String,

		// only for fish
		difficulty: String,
		vision: String,

		// only for bugs
		weather: String,

		nh_jan: String,
		nh_feb: String,
		nh_mar: String,
		nh_apr: String,
		nh_may: String,
		nh_jun: String,
		nh_jul: String,
		nh_aug: String,
		nh_sep: String,
		nh_oct: String,
		nh_nov: String,
		nh_dec: String,

		sh_jan: String,
		sh_feb: String,
		sh_mar: String,
		sh_apr: String,
		sh_may: String,
		sh_jun: String,
		sh_jul: String,
		sh_aug: String,
		sh_sep: String,
		sh_oct: String,
		sh_nov: String,
		sh_dec: String,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

export const Critter = model<ICritter>('Critter', CritterSchema);
