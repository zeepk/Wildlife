import { Document, Schema, model } from 'mongoose';
export interface IVillager extends Document {
	name: string;
	ueid: string;
	icon_uri: string;
	image_uri: string;
	species: string;
	gender: string;
	personality: string;
	birthday: string;
}

const VillagerSchema = new Schema<IVillager>(
	{
		name: String,
		ueid: String,
		icon_uri: String,
		image_uri: String,
		species: String,
		gender: String,
		personality: String,
		birthday: String,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Villager = model<IVillager>('Villager', VillagerSchema);
