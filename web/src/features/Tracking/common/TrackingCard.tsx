import React, { FunctionComponent, useState } from 'react';
import { useAppSelector } from 'app/hooks';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';

import { Fish } from 'features/Tracking/trackingTypes';
import { IconTemplate } from './IconTemplate';
import {
	selectAccountHemisphere,
	selectCaught,
} from 'features/Common/commonSlice';
import { hemispheres } from 'utils/constants';

type props = {
	item: Fish;
	// this will end up also including | Bug | Sea | Fossil | etc.
};

export const TrackingCard: FunctionComponent<props> = ({ item }) => {
	const [allowCheck, setAllowCheck] = useState(true);
	const hemisphere = useAppSelector(selectAccountHemisphere);
	const caught = useAppSelector(selectCaught);
	const isCaught = caught.includes(item.ueid);

	const months =
		hemisphere === hemispheres.SOUTHERN
			? item.southernMonths
			: item.northernMonths;

	const updateCaught = () => {
		if (!allowCheck) {
			return;
		}
		setAllowCheck(false);
		if (isCaught) {
		} else {
		}
	};

	const header = (
		<div className="header p-mx-2 p-py-0 p-d-flex p-ai-center p-jc-between">
			<div className="p-py-0">{item.name}</div>
			<Checkbox checked={isCaught} />
		</div>
	);

	const body = (
		<div className="p-d-flex p-ai-center p-jc-between p-px-2">
			<div className="container--icon">
				<IconTemplate uri={item.icon_uri} altText={item.name} />
			</div>
			{months}
		</div>
	);

	return (
		<Card className="p-m-3" header={header}>
			{body}
		</Card>
	);
};
