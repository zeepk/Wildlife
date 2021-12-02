import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getFish } from './trackingApi';
import { Fish } from 'features/Tracking/trackingTypes';

export interface TrackingState {
	loading: number;
	status: 'idle' | 'loading' | 'failed';
	fish: Array<Fish>;
}

const initialState: TrackingState = {
	status: 'idle',
	loading: 0,
	fish: [],
};

export const getAllFish = createAsyncThunk('tracking/fish', async () => {
	const response = await getFish();
	// The value we return becomes the `fulfilled` action payload
	return response;
});

// Loading is controlled by the number of loading calls currently active
// the loading count is increased when a call is made, and decreased when the call completes

const incrementLoading = (state: TrackingState) => {
	state.loading = state.loading + 1;
};

const decrementLoading = (state: TrackingState) => {
	state.loading = Math.max(state.loading - 1, 0);
};

export const trackingSlice = createSlice({
	name: 'tracking',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllFish.pending, (state) => {
				incrementLoading(state);
				state.fish = [];
			})
			.addCase(getAllFish.fulfilled, (state, action) => {
				decrementLoading(state);
				state.fish = action.payload.data;
			});
	},
});

// export const { increment, decrement, incrementByAmount } = trackingSlice.actions;

export const selectTrackingLoading = (state: RootState) =>
	state.tracking.loading > 0;
export const selectFish = (state: RootState) =>
	state.tracking.fish.slice().sort((a, b) => a.order - b.order);

export default trackingSlice.reducer;
