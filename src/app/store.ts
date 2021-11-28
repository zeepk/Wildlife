import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import fishReducer from 'features/Fish/fishSlice';
import commonReducer from 'features/Common/commonSlice';

export const store = configureStore({
	reducer: {
		fish: fishReducer,
		common: commonReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
