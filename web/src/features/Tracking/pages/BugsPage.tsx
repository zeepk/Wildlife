import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	getAllBugs,
	selectBugs,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TrackingCards } from '../common/TrackingCards';

export function BugsPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const bugs = useAppSelector(selectBugs);

	useEffect(() => {
		if (bugs.length === 0) {
			dispatch(getAllBugs());
		}
	}, [dispatch, bugs.length]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	return <TrackingCards items={bugs} />;
}
