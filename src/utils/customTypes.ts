import { ICaught } from '@/models/caught';
import { IProfile } from '@/models/profile';

export type ApiResponse = {
	success: boolean;
	message: string;
	data: any;
};

export type ProfileResponse = {
	isLoggedIn: boolean;
	profile: IProfile | null;
	caught: Array<ICaught> | null;
	friendProfiles: Array<IProfile> | null;
	tempAuthId: string | null;
};
