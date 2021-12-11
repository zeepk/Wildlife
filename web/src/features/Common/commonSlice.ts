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
} from './commonApi';
import {
	AuthDataCreateAccount,
	AuthDataUpdateProfile,
	Caught,
	Profile,
	UpdateCaughtPayload,
	Villager,
} from 'features/Common/commonTypes';
import { critterTypes } from 'utils/constants';
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
		};
		villagers: Array<Villager> | null;
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
		},
		villagers: [],
	},
};

export const getUserProfile = createAsyncThunk(
	'common/auth/isLoggedIn',
	async (authId: string) => {
		const response = await getProfile(authId);
		return response;
	},
);

export const createUserProfile = createAsyncThunk(
	'common/auth/createProfile',
	async (payload: AuthDataCreateAccount) => {
		const response = await createProfile(payload);
		return response;
	},
);

export const updateUserProfile = createAsyncThunk(
	'common/auth/updateProfile',
	async (payload: AuthDataUpdateProfile) => {
		const response = await updateProfile(payload);
		return response;
	},
);

export const getUserCaught = createAsyncThunk(
	'common/auth/getcaught',
	async (authId: string) => {
		const response = await getCaught(authId);
		return response;
	},
);

export const getAllVillagers = createAsyncThunk(
	'common/auth/getvillagers',
	async () => {
		const response = await getVillagers();
		return response;
	},
);

export const createUserCaught = createAsyncThunk(
	'common/auth/createcaught',
	async (
		data: { ueid: string; critterType?: critterTypes },
		{ getState, requestId },
	) => {
		// not using other params, but function won't work without them
		const state: any = getState();
		const authId = state.common.auth.account.profile.authId;
		const payload: UpdateCaughtPayload = {
			authId,
			ueid: data.ueid,
			critterType: data.critterType,
		};
		const response = await createCaught(payload);
		return response;
	},
);

export const deleteUserCaught = createAsyncThunk(
	'common/auth/deletecaught',
	async (ueid: string, { getState, requestId }) => {
		// not using other params, but function won't work without them
		const state: any = getState();
		const authId = state.common.auth.account.profile.authId;
		const payload: UpdateCaughtPayload = {
			authId,
			ueid,
		};
		const response = await deleteCaught(payload);
		return response;
	},
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
	extraReducers: (builder) => {
		builder
			.addCase(getUserProfile.pending, (state) => {
				incrementLoading(state);
			})
			.addCase(getUserProfile.rejected, (state) => {
				decrementLoading(state);
				console.log('could not find profile');
				state.auth.isLoggedIn = false;
			})
			.addCase(getUserProfile.fulfilled, (state, action) => {
				decrementLoading(state);
				if (action?.payload?.data) {
					const resp = action.payload.data;
					state.auth.account.profile = resp.profile;
					state.auth.account.caught = resp.caught;
					state.auth.isLoggedIn = true;
				}
			})
			.addCase(createUserProfile.pending, (state) => {
				incrementLoading(state);
			})
			.addCase(createUserProfile.rejected, (state) => {
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
			.addCase(updateUserProfile.rejected, (state) => {
				console.log('could not update profile');
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				if (action?.payload?.data?.success) {
					const resp = action.payload.data.profile;
					state.auth.account.profile = resp;
				}
			})
			.addCase(getAllVillagers.pending, (state) => {
				incrementLoading(state);
				state.auth.villagers = [];
			})
			.addCase(getAllVillagers.rejected, (state) => {
				decrementLoading(state);
				state.auth.villagers = null;
			})
			.addCase(getAllVillagers.fulfilled, (state, action) => {
				decrementLoading(state);
				if (action?.payload?.data) {
					state.auth.villagers = action.payload.data;
				}
			})
			.addCase(createUserCaught.rejected, () => {
				console.log('could not update caught status');
			})
			.addCase(createUserCaught.fulfilled, (state, action) => {
				if (action?.payload?.data) {
					console.log(action.payload.data);
					state.auth.account.caught.push(action.payload.data);
					state.auth.account.caught = [
						...state.auth.account.caught,
						action.payload.data,
					];
				}
			})
			.addCase(deleteUserCaught.rejected, () => {
				console.log('could not update caught status');
			})
			.addCase(deleteUserCaught.fulfilled, (state, action) => {
				if (action?.payload?.data) {
					console.log(action);
					state.auth.account.caught = state.auth.account.caught.filter(
						(c) => c.ueid !== action.payload.data.euid,
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
export const selectAccountUsername = (state: RootState) =>
	state.common.auth.account.profile?.username;
export const selectAuthId = (state: RootState) =>
	state.common.auth.account.profile?.authId;
export const selectAccountHemisphere = (state: RootState) =>
	state.common.auth.account.profile?.hemisphere;
export const selectAccountAvatar = (state: RootState) =>
	state.common.auth.account.profile?.avatar;
export const selectAccountAvatarId = (state: RootState) =>
	state.common.auth.account.profile?.avatarId;
export const selectAuthError = (state: RootState) => state.common.auth.error;
export const selectAuthErrorMessage = (state: RootState) =>
	state.common.auth.errorMessage;
export const selectVillagers = (state: RootState) =>
	state.common.auth.villagers;

export const selectCaught = (state: RootState) =>
	state.common.auth.account.caught.map((c) => c.ueid);

export default commonSlice.reducer;
