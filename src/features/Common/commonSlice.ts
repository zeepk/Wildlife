import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { checkIfUserLoggedIn, logUserIn, createUserAccount } from './commonApi';
import {
	AuthDataCreateAccount,
	AuthDataLogin,
} from 'features/Common/commonTypes';

export interface CommonState {
	auth: {
		error: boolean;
		errorMessage: string | null;
		loading: boolean;
		resetLoading: boolean;
		loginLoading: boolean;
		createLoading: boolean;
		isLoggedIn: boolean;
		username: string;
	};
}

const initialState: CommonState = {
	auth: {
		error: false,
		errorMessage: null,
		loading: false,
		resetLoading: false,
		loginLoading: false,
		createLoading: false,
		isLoggedIn: false,
		username: '',
	},
};

export const getToken = () => {
	const cookie = document.cookie;
	let token;
	try {
		token = cookie.split('authtoken=')[1].split(';')[0];
	} catch (error) {
		token = null;
	}
	return token;
};

export const isUserLoggedIn = createAsyncThunk(
	'common/auth/isLoggedIn',
	async () => {
		const token = getToken();
		if (!token) {
			return;
		}

		const response = await checkIfUserLoggedIn(token);
		return response;
	}
);

export const logIn = createAsyncThunk(
	'common/auth/login',
	async (data: AuthDataLogin) => {
		const response = await logUserIn(data);
		return response;
	}
);

export const createAccount = createAsyncThunk(
	'common/auth/create',
	async (data: AuthDataCreateAccount) => {
		const response = await createUserAccount(data);
		return response;
	}
);

export const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		logOut(state) {
			document.cookie = 'authtoken=';
			state.auth.isLoggedIn = false;
			state.auth.username = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(isUserLoggedIn.pending, (state) => {
				state.auth.loading = true;
			})
			.addCase(isUserLoggedIn.rejected, (state) => {
				state.auth.loading = false;
				state.auth.isLoggedIn = false;
			})
			.addCase(isUserLoggedIn.fulfilled, (state, action) => {
				state.auth.loading = false;
				if (action.payload?.data) {
					state.auth.isLoggedIn = action.payload.data.success;
					state.auth.username = action.payload.data.data;
				}
			})
			.addCase(logIn.pending, (state) => {
				state.auth.loginLoading = true;
			})
			.addCase(logIn.rejected, (state) => {
				state.auth.loginLoading = false;
				state.auth.error = true;
			})
			.addCase(logIn.fulfilled, (state, action) => {
				state.auth.loginLoading = false;
				if (action.payload.data) {
					state.auth.error = false;
					state.auth.isLoggedIn = action.payload.data.success;
					document.cookie = `authtoken=${action.payload.data.token}; expires=Thu, 18 Dec 2099 12:00:00 UTC`;
				} else {
					state.auth.error = true;
				}
			})
			.addCase(createAccount.pending, (state) => {
				state.auth.createLoading = true;
			})
			.addCase(createAccount.rejected, (state) => {
				state.auth.createLoading = false;
				state.auth.error = true;
			})
			.addCase(createAccount.fulfilled, (state, action) => {
				state.auth.createLoading = false;
				if (action.payload.data.errors) {
					state.auth.error = true;
					state.auth.errorMessage =
						action.payload.data.errors[0] || 'Invalid form submission';
				} else {
					state.auth.error = false;
					state.auth.isLoggedIn = true;
					document.cookie = `authtoken=${action.payload.data.token}; expires=Thu, 18 Dec 2099 12:00:00 UTC`;
				}
			});
	},
});

export const { logOut } = commonSlice.actions;

export const selectAuthIsLoggedIn = (state: RootState) =>
	state.common.auth.isLoggedIn;
export const selectAuthUsername = (state: RootState) =>
	state.common.auth.username;
export const selectAuthLoginLoading = (state: RootState) =>
	state.common.auth.loginLoading;
export const selectAuthCreateLoading = (state: RootState) =>
	state.common.auth.createLoading;
export const selectAuthLoading = (state: RootState) =>
	state.common.auth.loading;
export const selectAuthResetLoading = (state: RootState) =>
	state.common.auth.resetLoading;
export const selectAuthError = (state: RootState) => state.common.auth.error;
export const selectAuthErrorMessage = (state: RootState) =>
	state.common.auth.errorMessage;

export default commonSlice.reducer;
