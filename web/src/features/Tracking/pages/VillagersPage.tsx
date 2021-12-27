import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';
import { TrackingCards } from '../common/TrackingCards';
import {
	selectAuthLoading,
	getAllVillagers,
	selectVillagers,
} from 'features/Common/commonSlice';

export function VillagersPage() {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(selectAuthLoading);
	const villagers = useAppSelector(selectVillagers);

	useEffect(() => {
		if (villagers?.length === 0) {
			dispatch(getAllVillagers());
		}
	}, [dispatch, villagers?.length]);

	if (loading || villagers === null) {
		return <LoadingIcon fullScreen={true} />;
	}

	return <TrackingCards items={villagers} />;
}
