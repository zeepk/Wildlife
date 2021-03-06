import { Document, Schema, model } from 'mongoose';
export interface IReaction extends Document {
	name: string;
	order: number;
	ueid: string;
	image_uri: string;
	source: string;
	source_notes: string;
	event: string;
	exclusive: boolean;
	critter_type: string;
}

const ReactionSchema = new Schema<IReaction>(
	{
		name: String,
		order: Number,
		ueid: String,
		image_uri: String,
		source: String,
		source_notes: String,
		event: String,
		exclusive: Boolean,
		critter_type: String,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Reaction = model<IReaction>('Reaction', ReactionSchema);
