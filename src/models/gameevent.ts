import { Document, Schema, model } from 'mongoose';
export interface IGameEvent extends Document {
	name: string;
	ueid: string;
	type: string;
	year: string;
	dates_nh: string;
	dates_sh: string;
	display_name: string;
}

const GameEventSchema = new Schema<IGameEvent>(
	{
		name: String,
		ueid: String,
		type: String,
		year: String,
		dates_nh: String,
		dates_sh: String,
		display_name: String,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

export const GameEvent = model<IGameEvent>('GameEvent', GameEventSchema);
