import React, { FunctionComponent } from 'react';
import { Card } from 'primereact/card';
import { Checkbox } from 'primereact/checkbox';

import { Fish } from 'features/Tracking/trackingTypes';
import { IconTemplate } from './IconTemplate';

type props = {
	item: Fish;
	// this will end up also including | Bug | Sea | Fossil | etc.
};

export const TrackingCard: FunctionComponent<props> = ({ item }) => {
	// checked is going to be listOfCollected.includes(item.ueid)
	const header = (
		<div className="header p-mx-2 p-py-0 p-d-flex p-ai-center p-jc-between">
			<div className="p-py-0">{item.name}</div>
			<Checkbox checked={item.order % 2 === 0} />
		</div>
	);

	const body = (
		<div className="p-d-flex p-ai-center p-jc-between p-px-2">
			<div className="container--icon">
				<IconTemplate uri={item.icon_uri} altText={item.name} />
			</div>
			{item.months}
		</div>
	);

	return (
		<Card className="p-m-3" header={header}>
			{body}
		</Card>
	);
};
