import { Document, Schema, model } from 'mongoose';
export interface IFossil extends Document {
	name: string;
	ueid: string;
	image_uri: string;
	bells_sell: number;
}

const FossilSchema = new Schema<IFossil>(
	{
		name: String,
		ueid: String,
		image_uri: String,
		bells_sell: Number,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Fossil = model<IFossil>('Fossil', FossilSchema);
