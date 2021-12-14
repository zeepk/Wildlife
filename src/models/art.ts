import { Document, Schema, model } from 'mongoose';
export interface IArt extends Document {
	name: string;
	critter_type: string;
	ueid: string;
	icon_uri: string;
	image_uri: string;
	genuine: boolean;
	fake_uri: string;
}

const ArtSchema = new Schema<IArt>(
	{
		name: String,
		ueid: String,
		icon_uri: String,
		image_uri: String,
		genuine: Boolean,
		fake_uri: String,
		critter_type: String,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Art = model<IArt>('Art', ArtSchema);
