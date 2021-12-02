import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getProfile, createProfile, getCaught } from './commonApi';
import {
	AuthDataCreateAccount,
	Caught,
	Profile,
} from 'features/Common/commonTypes';
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
	},
};

export const getUserProfile = createAsyncThunk(
	'common/auth/isLoggedIn',
	async (userId: string) => {
		const response = await getProfile(userId);
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

export const getUserCaught = createAsyncThunk(
	'common/auth/getcaught',
	async (userId: string) => {
		const response = await getCaught(userId);
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
export const selectAccountAvatar = (state: RootState) =>
	state.common.auth.account.profile?.avatar;
export const selectAuthError = (state: RootState) => state.common.auth.error;
export const selectAuthErrorMessage = (state: RootState) =>
	state.common.auth.errorMessage;

export default commonSlice.reducer;
