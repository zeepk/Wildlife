import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	getAllFossils,
	selectFossils,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TrackingCards } from '../common/TrackingCards';

export function FossilsPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const fossils = useAppSelector(selectFossils);

	useEffect(() => {
		if (fossils.length === 0) {
			dispatch(getAllFossils());
		}
	}, [dispatch, fossils.length]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	return <TrackingCards items={fossils} />;
}
