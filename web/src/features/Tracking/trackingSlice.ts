import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
	getArt,
	getBugs,
	getFish,
	getFossils,
	getMusic,
	getReactions,
	getSea,
	getAchievements,
} from 'features/Tracking/trackingApi';
import {
	Art,
	Bug,
	Fish,
	Fossil,
	Music,
	Reaction,
	Sea,
	Achievement,
} from 'features/Tracking/trackingTypes';

export interface TrackingState {
	loading: number;
	status: 'idle' | 'loading' | 'failed';
	fish: Array<Fish>;
	bugs: Array<Bug>;
	sea: Array<Sea>;
	fossils: Array<Fossil>;
	art: Array<Art>;
	reactions: Array<Reaction>;
	music: Array<Music>;
	achievements: Array<Achievement>;
}

const initialState: TrackingState = {
	status: 'idle',
	loading: 0,
	fish: [],
	bugs: [],
	sea: [],
	fossils: [],
	art: [],
	reactions: [],
	music: [],
	achievements: [],
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

export const getAllFossils = createAsyncThunk('tracking/fossils', async () => {
	const response = await getFossils();
	return response;
});

export const getAllArt = createAsyncThunk('tracking/art', async () => {
	const response = await getArt();
	return response;
});

export const getAllMusic = createAsyncThunk('tracking/music', async () => {
	const response = await getMusic();
	return response;
});

export const getAllReactions = createAsyncThunk(
	'tracking/reactions',
	async () => {
		const response = await getReactions();
		return response;
	}
);

export const getAllAchievements = createAsyncThunk(
	'tracking/achievements',
	async () => {
		const response = await getAchievements();
		return response;
	}
);

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
			})
			.addCase(getAllFossils.pending, (state) => {
				incrementLoading(state);
				state.fossils = [];
			})
			.addCase(getAllFossils.fulfilled, (state, action) => {
				decrementLoading(state);
				state.fossils = action.payload.data;
			})
			.addCase(getAllReactions.pending, (state) => {
				incrementLoading(state);
				state.reactions = [];
			})
			.addCase(getAllReactions.fulfilled, (state, action) => {
				decrementLoading(state);
				state.reactions = action.payload.data;
			})
			.addCase(getAllMusic.pending, (state) => {
				incrementLoading(state);
				state.music = [];
			})
			.addCase(getAllMusic.fulfilled, (state, action) => {
				decrementLoading(state);
				state.music = action.payload.data;
			})
			.addCase(getAllAchievements.pending, (state) => {
				incrementLoading(state);
				state.achievements = [];
			})
			.addCase(getAllAchievements.fulfilled, (state, action) => {
				decrementLoading(state);
				state.achievements = action.payload.data;
			})
			.addCase(getAllArt.pending, (state) => {
				incrementLoading(state);
				state.art = [];
			})
			.addCase(getAllArt.fulfilled, (state, action) => {
				decrementLoading(state);
				state.art = action.payload.data;
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
export const selectFossils = (state: RootState) => state.tracking.fossils;
export const selectArt = (state: RootState) => state.tracking.art;
export const selectMusic = (state: RootState) => state.tracking.music;
export const selectAchievements = (state: RootState) =>
	state.tracking.achievements;
export const selectReactions = (state: RootState) =>
	state.tracking.reactions.slice().sort((a, b) => a.order - b.order);

export default trackingSlice.reducer;
