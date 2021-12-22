import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	getAllMusic,
	selectMusic,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TrackingCards } from '../common/TrackingCards';

export function MusicPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const reactions = useAppSelector(selectMusic);

	useEffect(() => {
		if (reactions.length === 0) {
			dispatch(getAllMusic());
		}
	}, [dispatch, reactions.length]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	return <TrackingCards items={reactions} />;
}
