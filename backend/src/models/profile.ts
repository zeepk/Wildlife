import { hemispheres } from '@/utils/constants';
import { Document, Schema, model } from 'mongoose';
export interface IProfile extends Document {
	authId: string;
	username: string;
	avatar: string;
	friends: Array<string>;
	hemisphere: hemispheres;
}

const ProfileSchema = new Schema<IProfile>(
	{
		authId: String,
		username: String,
		avatar: String,
		friends: Array,
		hemisphere: hemispheres.NORTHERN,
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt',
		},
	},
);

export const Profile = model<IProfile>('Profile', ProfileSchema);
