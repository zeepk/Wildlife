import { Document, Schema, model } from 'mongoose';
export interface ISong extends Document {
	name: string;
	ueid: string;
	image_uri: string;
	source: string;
	source_notes: string;
}

const SongSchema = new Schema<ISong>(
	{
		name: String,
		ueid: String,
		image_uri: String,
		source: String,
		source_notes: String,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Song = model<ISong>('Song', SongSchema);
