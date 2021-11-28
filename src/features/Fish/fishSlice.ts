import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getFish } from './fishApi';

export interface FishState {
	name: string;
	loading: number;
	status: 'idle' | 'loading' | 'failed';
}

const initialState: FishState = {
	status: 'idle',
	name: '',
	loading: 0,
};

export const getFishName = createAsyncThunk(
	'fish/name',
	async (username: string) => {
		const response = await getFish(username);
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

// Loading is controlled by the number of loading calls currently active
// the loading count is increased when a call is made, and decreased when the call completes

const incrementPlayerLoading = (state: FishState) => {
	state.loading = state.loading + 1;
};

const decrementPlayerLoading = (state: FishState) => {
	state.loading = Math.max(state.loading - 1, 0);
};

export const fishSlice = createSlice({
	name: 'fish',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getFishName.pending, (state) => {
				incrementPlayerLoading(state);
				state.name = '';
			})
			.addCase(getFishName.fulfilled, (state, action) => {
				decrementPlayerLoading(state);
				state.name = action.payload.data.fish.name;
			});
	},
});

// export const { increment, decrement, incrementByAmount } = fishSlice.actions;

export const selectFishLoading = (state: RootState) => state.fish.loading > 0;
export const selectFishName = (state: RootState) => state.fish.name;

export default fishSlice.reducer;
