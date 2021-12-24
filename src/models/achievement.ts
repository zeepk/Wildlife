import { Document, Schema, model } from 'mongoose';
export interface IAchievement extends Document {
	name: string;
	critter_type: string;
	ueid: string;
	description: string;
	requirements: string;
	order: number;
	category: string;

	tiers: number;
	tier1: number | null;
	tier2: number | null;
	tier3: number | null;
	tier4: number | null;
	tier5: number | null;
	tier6: number | null;

	tier1Reward: number | null;
	tier2Reward: number | null;
	tier3Reward: number | null;
	tier4Reward: number | null;
	tier5Reward: number | null;
	tier6Reward: number | null;

	tier1Noun: string | null;
	tier2Noun: string | null;
	tier3Noun: string | null;
	tier4Noun: string | null;
	tier5Noun: string | null;
	tier6Noun: string | null;

	tier1Modifier: string | null;
	tier2Modifier: string | null;
	tier3Modifier: string | null;
	tier4Modifier: string | null;
	tier5Modifier: string | null;
	tier6Modifier: string | null;

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

		tiers: Number,
		tier1: Number,
		tier2: Number,
		tier3: Number,
		tier4: Number,
		tier5: Number,
		tier6: Number,

		tier1Reward: Number,
		tier2Reward: Number,
		tier3Reward: Number,
		tier4Reward: Number,
		tier5Reward: Number,
		tier6Reward: Number,

		tier1Noun: String,
		tier2Noun: String,
		tier3Noun: String,
		tier4Noun: String,
		tier5Noun: String,
		tier6Noun: String,

		tier1Modifier: String,
		tier2Modifier: String,
		tier3Modifier: String,
		tier4Modifier: String,
		tier5Modifier: String,
		tier6Modifier: String,

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
