import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	getAllArt,
	selectArt,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TrackingCards } from '../common/TrackingCards';

export function ArtPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const art = useAppSelector(selectArt);

	useEffect(() => {
		if (art.length === 0) {
			dispatch(getAllArt());
		}
	}, [dispatch, art.length]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	return <TrackingCards items={art} />;
}
