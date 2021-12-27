import { Document, Schema, model } from 'mongoose';

export interface ITier {
	number: number;
	reward: number;
	modifier: string;
	noun: string;
}

const TierSchema = new Schema({
	number: Number,
	reward: Number,
	modifier: String,
	noun: String,
});

export const Tier = model<ITier>('Tier', TierSchema);
export interface IAchievement extends Document {
	name: string;
	critter_type: string;
	ueid: string;
	description: string;
	requirements: string;
	order: number;
	category: string;

	tierCount: number | null;
	tiers: Array<ITier>;
	sequential: boolean;
}

const AchievementSchema = new Schema<IAchievement>(
	{
		name: String,
		critter_type: String,
		ueid: String,
		description: String,
		requirements: String,
		order: Number,
		category: String,

		tierCount: Number,
		tiers: [TierSchema],
		sequential: Boolean,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

export const Achievement = model<IAchievement>(
	'Achievement',
	AchievementSchema
);
