import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getBugs, getFish, getSea } from './trackingApi';
import { Bug, Fish, Sea } from 'features/Tracking/trackingTypes';

export interface TrackingState {
	loading: number;
	status: 'idle' | 'loading' | 'failed';
	fish: Array<Fish>;
	bugs: Array<Bug>;
	sea: Array<Sea>;
}

const initialState: TrackingState = {
	status: 'idle',
	loading: 0,
	fish: [],
	bugs: [],
	sea: [],
};

export const getAllFish = createAsyncThunk('tracking/fish', async () => {
	const response = await getFish();
	return response;
});

export const getAllBugs = createAsyncThunk('tracking/bugs', async () => {
	const response = await getBugs();
	return response;
});

export const getAllSea = createAsyncThunk('tracking/sea', async () => {
	const response = await getSea();
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
			})
			.addCase(getAllBugs.pending, (state) => {
				incrementLoading(state);
				state.bugs = [];
			})
			.addCase(getAllBugs.fulfilled, (state, action) => {
				decrementLoading(state);
				state.bugs = action.payload.data;
			})
			.addCase(getAllSea.pending, (state) => {
				incrementLoading(state);
				state.sea = [];
			})
			.addCase(getAllSea.fulfilled, (state, action) => {
				decrementLoading(state);
				state.sea = action.payload.data;
			});
	},
});

// export const { increment, decrement, incrementByAmount } = trackingSlice.actions;

export const selectTrackingLoading = (state: RootState) =>
	state.tracking.loading > 0;
export const selectFish = (state: RootState) =>
	state.tracking.fish.slice().sort((a, b) => a.order - b.order);
export const selectBugs = (state: RootState) =>
	state.tracking.bugs.slice().sort((a, b) => a.order - b.order);
export const selectSea = (state: RootState) =>
	state.tracking.sea.slice().sort((a, b) => a.order - b.order);

export default trackingSlice.reducer;
