import { ICaught } from '@/models/caught';
import { IProfile } from '@/models/profile';

export type ProfileResponse = {
	isLoggedIn: boolean;
	profile: IProfile | null;
	caught: Array<ICaught> | null;
	friendProfiles: Array<IProfile> | null;
	tempAuthId: string | null;
};
