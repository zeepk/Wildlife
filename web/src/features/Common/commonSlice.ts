import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
	getProfile,
	createProfile,
	getCaught,
	getVillagers,
	updateProfile,
	createCaught,
	deleteCaught,
	importData,
	getFriendRequests,
	searchForProfile,
	sendFriendRequest,
	respondToFriendRequest,
	removeFriend,
} from './commonApi';
import {
	AuthDataCreateAccount,
	AuthDataUpdateProfile,
	Caught,
	FriendRequest,
	Profile,
	UpdateCaughtPayload,
	Villager,
} from 'features/Common/commonTypes';
import { critterTypes, maxNumberOfVillagers } from 'utils/constants';
import { isNullOrUndefined } from 'utils/helperFunctions';
export interface CommonState {
	auth: {
		error: boolean;
		errorMessage: string | null;
		loading: number;
		resetLoading: boolean;
		loginLoading: boolean;
		createLoading: boolean;
		isLoggedIn: boolean;
		account: {
			profile: Profile | null;
			caught: Array<Caught>;
			friends: Array<Profile>;
			incomingFriendRequests: Array<FriendRequest>;
			outgoingFriendRequests: Array<FriendRequest>;
		};
		villagers: {
			villagers: Array<Villager> | null;
			species: Array<string> | null;
			personalities: Array<string> | null;
		};
	};
}

const initialState: CommonState = {
	auth: {
		error: false,
		errorMessage: null,
		loading: 0,
		resetLoading: false,
		loginLoading: false,
		createLoading: false,
		isLoggedIn: false,
		account: {
			profile: null,
			caught: [],
			friends: [],
			incomingFriendRequests: [],
			outgoingFriendRequests: [],
		},
		villagers: {
			villagers: [],
			species: [],
			personalities: [],
		},
	},
};

export const getUserProfile = createAsyncThunk(
	'common/auth/isLoggedIn',
	async () => {
		const response = await getProfile();
		return response;
	}
);

export const createUserProfile = createAsyncThunk(
	'common/auth/createProfile',
	async (payload: AuthDataCreateAccount) => {
		const response = await createProfile(payload);
		return response;
	}
);

export const updateUserProfile = createAsyncThunk(
	'common/auth/updateProfile',
	async (payload: AuthDataUpdateProfile, { getState, requestId }) => {
		const state: any = getState();
		payload.authId = state.common.auth.account.profile.authId;
		const response = await updateProfile(payload);
		return response;
	}
);

export const getUserCaught = createAsyncThunk(
	'common/auth/getcaught',
	async (authId: string) => {
		const response = await getCaught(authId);
		return response;
	}
);

export const getAllVillagers = createAsyncThunk(
	'common/auth/getvillagers',
	async () => {
		const response = await getVillagers();
		return response;
	}
);

export const createUserCaught = createAsyncThunk(
	'common/auth/createcaught',
	async (
		data: { ueid: string; critterType?: critterTypes; value?: number },
		{ getState, requestId }
	) => {
		// not using other params, but function won't work without them
		const state: any = getState();
		const authId = state.common.auth.account.profile.authId;
		const payload: UpdateCaughtPayload = {
			authId,
			ueid: data.ueid,
			critterType: data.critterType,
			value: data.value,
		};
		const response = await createCaught(payload);
		return response;
	}
);

export const deleteUserCaught = createAsyncThunk(
	'common/auth/deletecaught',
	async (data: { ueid: string; value?: number }, { getState, requestId }) => {
		// not using other params, but function won't work without them
		const state: any = getState();
		const authId = state.common.auth.account.profile.authId;
		const payload: UpdateCaughtPayload = {
			authId,
			ueid: data.ueid,
			value: data.value,
		};
		const response = await deleteCaught(payload);
		return response;
	}
);

export const importCaughtData = createAsyncThunk(
	'common/auth/importcaught',
	async (caughtItems: Array<string>, { getState, requestId }) => {
		// not using other params, but function won't work without them
		const state: any = getState();
		const authId = state.common.auth.account.profile.authId;
		const payload = {
			authId,
			caughtItems,
		};
		const response = await importData(payload);
		return response;
	}
);

export const getUserFriendRequests = createAsyncThunk(
	'common/auth/importcaught',
	async (data, { getState, requestId }) => {
		// not using other params, but function won't work without them
		const state: any = getState();
		const authId = state.common.auth.account.profile.authId;
		const response = await getFriendRequests(authId);
		return response;
	}
);

export const searchForUser = createAsyncThunk(
	'common/auth/search',
	async (username: string, { getState, requestId }) => {
		// not using other params, but function won't work without them
		const state: any = getState();
		let profileId = null;
		if (!isNullOrUndefined(state.common.auth.account.profile)) {
			profileId = state.common.auth.account.profile._id.toString();
		}
		const response = await searchForProfile({ username, profileId });
		return response;
	}
);

export const sendUserFriendRequest = createAsyncThunk(
	'common/auth/sendfriendrequest',
	async (username: string) => {
		const response = await sendFriendRequest(username);
		return response;
	}
);

export const removeUserFriend = createAsyncThunk(
	'common/auth/removefriend',
	async (username: string) => {
		const response = await removeFriend(username);
		return response;
	}
);

export const respondToUserFriendRequest = createAsyncThunk(
	'common/auth/respondtofriendrequest',
	async (data: { requestId: string; accepted: boolean }) => {
		const response = await respondToFriendRequest(data);
		return response;
	}
);

const incrementLoading = (state: CommonState) => {
	state.auth.loading = state.auth.loading + 1;
};

const decrementLoading = (state: CommonState) => {
	state.auth.loading = Math.max(state.auth.loading - 1, 0);
};

export const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		updateUserInfo(state, args) {
			// console.log(args);
		},
	},
	extraReducers: builder => {
		builder
			.addCase(getUserProfile.pending, state => {
				incrementLoading(state);
			})
			.addCase(getUserProfile.rejected, state => {
				decrementLoading(state);
				state.auth.isLoggedIn = false;
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				if (action?.payload?.data) {
					const resp = action.payload.data;
					const data = resp.data;

					state.auth.isLoggedIn = data.isLoggedIn;
					if (resp.success && data.profile) {
						state.auth.account.profile = data.profile;
						state.auth.account.caught = data.caught;
						state.auth.account.friends = data.friendProfiles;
						for (let i = 0; i < maxNumberOfVillagers; i++) {
							if (
								state.auth.account.profile &&
								!state.auth.account.profile?.villagers[i]
							) {
								state.auth.account.profile.villagers[i] = null;
							}
						}
					}
				}
				decrementLoading(state);
			})
			.addCase(createUserProfile.pending, state => {
				incrementLoading(state);
			})
			.addCase(createUserProfile.rejected, state => {
				decrementLoading(state);
				console.log('could not create profile');
				state.auth.isLoggedIn = false;
			})
			.addCase(createUserProfile.fulfilled, (state, action) => {
				decrementLoading(state);
				if (action?.payload?.data) {
					const resp = action.payload.data;
					state.auth.account.profile = resp;
					state.auth.isLoggedIn = true;
				}
			})
			.addCase(updateUserProfile.rejected, state => {
				console.log('could not update profile');
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				if (action?.payload?.data?.success) {
					const resp = action.payload.data.profile;
					state.auth.account.profile = resp;
				}
			})
			.addCase(getAllVillagers.pending, state => {
				incrementLoading(state);
				state.auth.villagers.villagers = [];
				state.auth.villagers.personalities = [];
				state.auth.villagers.species = [];
			})
			.addCase(getAllVillagers.rejected, state => {
				decrementLoading(state);
				state.auth.villagers.villagers = null;
				state.auth.villagers.personalities = null;
				state.auth.villagers.species = null;
			})
			.addCase(getAllVillagers.fulfilled, (state, action) => {
				decrementLoading(state);
				if (action?.payload?.data) {
					state.auth.villagers.villagers = action.payload.data.villagers;
					state.auth.villagers.species = action.payload.data.species;
					state.auth.villagers.personalities =
						action.payload.data.personalities;
				}
			})
			.addCase(createUserCaught.rejected, () => {
				console.log('could not update caught status');
			})
			.addCase(createUserCaught.fulfilled, (state, action) => {
				if (action?.payload?.data) {
					state.auth.account.caught = [
						...state.auth.account.caught,
						...action.payload.data,
					];
				}
			})
			.addCase(deleteUserCaught.rejected, () => {
				console.log('could not update caught status');
			})
			.addCase(deleteUserCaught.fulfilled, (state, action) => {
				if (action?.payload?.data) {
					state.auth.account.caught = state.auth.account.caught.filter(c => {
						if (c.ueid === action.payload.data.ueid) {
							if (action.payload.data.sequential) {
								return false;
							} else {
								return c.value !== action.payload.data.value;
							}
						}
						return true;
					});
				}
			})
			.addCase(getUserFriendRequests.fulfilled, (state, action) => {
				if (action?.payload?.data) {
					state.auth.account.incomingFriendRequests =
						action.payload.data.incomingFriendRequests;
					state.auth.account.outgoingFriendRequests =
						action.payload.data.outgoingFriendRequests;
				}
			})
			.addCase(respondToUserFriendRequest.fulfilled, (state, action) => {
				const data = action?.payload?.data;
				if (data) {
					state.auth.account.incomingFriendRequests =
						state.auth.account.incomingFriendRequests.filter(
							r => r.requestor._id !== data.newFriend._id
						);
					if (data.accepted) {
						state.auth.account.friends.push(action.payload.data.newFriend);
					}
				}
			})
			.addCase(removeUserFriend.fulfilled, (state, action) => {
				const data = action?.payload?.data;
				console.log(data);
				if (data) {
					state.auth.account.friends = state.auth.account.friends.filter(
						f => f.username !== data.data
					);
				}
			});
	},
});

export const { updateUserInfo } = commonSlice.actions;

export const selectAuthIsLoggedIn = (state: RootState) =>
	state.common.auth.isLoggedIn;
export const selectAuthLoading = (state: RootState) =>
	state.common.auth.loading > 0;
export const selectAuthError = (state: RootState) => state.common.auth.error;
export const selectAuthErrorMessage = (state: RootState) =>
	state.common.auth.errorMessage;

export const selectAccountExists = (state: RootState) =>
	!isNullOrUndefined(state.common.auth.account.profile);
export const selectAccountUsername = (state: RootState) =>
	state.common.auth.account.profile?.username;
export const selectAuthId = (state: RootState) =>
	state.common.auth.account.profile?.authId;
export const selectAccountHemisphere = (state: RootState) =>
	state.common.auth.account.profile?.hemisphere;
export const selectAccountHideCaught = (state: RootState) =>
	state.common.auth.account.profile?.hideCaught;
export const selectAccountIslandName = (state: RootState) =>
	state.common.auth.account.profile?.islandName;
export const selectAccountAvatar = (state: RootState) =>
	state.common.auth.account.profile?.avatar;
export const selectAccountAvatarId = (state: RootState) =>
	state.common.auth.account.profile?.avatarId;
export const selectAccountVillagers = (state: RootState) =>
	state.common.auth.account.profile?.villagers;

export const selectAccountFriends = (state: RootState) =>
	state.common.auth.account.friends;
export const selectAccountIncomingFriendRequests = (state: RootState) =>
	state.common.auth.account.incomingFriendRequests;
export const selectAccountOutgoingFriendRequests = (state: RootState) =>
	state.common.auth.account.outgoingFriendRequests;

export const selectVillagers = (state: RootState) =>
	state.common.auth.villagers.villagers;
export const selectVillagerSpecies = (state: RootState) =>
	state.common.auth.villagers.species;
export const selectVillagerPersonalities = (state: RootState) =>
	state.common.auth.villagers.personalities;

export const selectCaughtUeids = (state: RootState) =>
	state.common.auth.account.caught.map(c => c.ueid);
export const selectCaught = (state: RootState) =>
	state.common.auth.account.caught;

export default commonSlice.reducer;
