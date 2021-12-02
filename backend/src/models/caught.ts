import { Document, Schema, model } from 'mongoose';
import { critterTypes } from '@/utils/constants';
export interface ICaught extends Document {
	id: string;
	userId: string;
	ueid: string;
	name: string;
	active: boolean;
	critterType: number | undefined;
}

const CaughtSchema = new Schema<ICaught>(
	{
		id: String,
		userId: String,
		ueid: String,
		name: String,
		active: Boolean,
		critterType: {
			type: Number,
			enum: critterTypes,
			default: critterTypes.FISH,
		},
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

export const Caught = model<ICaught>('Caught', CaughtSchema);
