import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	getAllSea,
	selectSea,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TrackingCards } from '../common/TrackingCards';

export function SeaPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const sea = useAppSelector(selectSea);

	useEffect(() => {
		if (sea.length === 0) {
			dispatch(getAllSea());
		}
	}, [dispatch, sea.length]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	return <TrackingCards items={sea} />;
}
