import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import {
	getAllFish,
	selectFish,
	selectTrackingLoading,
} from 'features/Tracking/trackingSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TrackingCard } from '../common/TrackingCard';

export function FishPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectTrackingLoading);
	const fish = useAppSelector(selectFish);

	useEffect(() => {
		dispatch(getAllFish());
	}, [dispatch]);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	const fishCards = fish.map((f) => <TrackingCard item={f} />);

	return (
		<div className="container--tracking-cards fish p-d-flex p-flex-wrap">
			{fishCards}
		</div>
	);
}
