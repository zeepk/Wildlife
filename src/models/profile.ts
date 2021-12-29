import { hemispheres } from '@/utils/constants';
import { Document, Schema, model } from 'mongoose';
export interface IProfile extends Document {
	authId: string;
	username: string;
	islandName: string;
	hideCaught: boolean;
	avatar: string;
	avatarId: string;
	friends: Array<string>;
	hemisphere: hemispheres;
}

const ProfileSchema = new Schema<IProfile>(
	{
		authId: String,
		username: String,
		islandName: String,
		hideCaught: Boolean,
		avatar: String,
		avatarId: String,
		friends: Array,
		hemisphere: hemispheres.NORTHERN,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	}
);

export const Profile = model<IProfile>('Profile', ProfileSchema);
