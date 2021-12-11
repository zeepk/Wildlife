import { Document, Schema, model } from 'mongoose';
import { critterTypes } from '@/utils/constants';
export interface ICaught extends Document {
	authId: string;
	ueid: string;
	active: boolean;
	critterType: string | undefined;
}

const CaughtSchema = new Schema<ICaught>(
	{
		authId: String,
		ueid: String,
		active: Boolean,
		critterType: {
			type: String,
			enum: critterTypes,
			default: critterTypes.FISH,
		},
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Caught = model<ICaught>('Caught', CaughtSchema);
