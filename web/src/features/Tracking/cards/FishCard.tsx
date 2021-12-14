import React, { FunctionComponent } from 'react';
import { Fish } from 'features/Tracking/trackingTypes';
import { useAppSelector } from 'app/hooks';
import { selectAccountHemisphere } from 'features/Common/commonSlice';
import { hemispheres } from 'utils/constants';

type props = {
	item: Fish;
};

export const TrackingCards: FunctionComponent<props> = ({ item }) => {
	const hemisphere = useAppSelector(selectAccountHemisphere);

	const months =
		hemisphere === hemispheres.SOUTHERN
			? item.southernMonths
			: item.northernMonths;

	return <div className=""></div>;
};
