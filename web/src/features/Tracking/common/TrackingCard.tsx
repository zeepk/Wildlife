import React, { FunctionComponent } from 'react';
import { Card } from 'primereact/card';

import { Fish } from 'features/Tracking/trackingTypes';
import { IconTemplate } from './IconTemplate';

type props = {
	item: Fish;
	// this will end up also including | Bug | Sea | Fossil | etc.
};

export const TrackingCard: FunctionComponent<props> = ({ item }) => {
	const header = <div className="header p-mx-2">{item.name}</div>;

	const body = (
		<div className="p-d-flex p-ai-center p-jc-between">
			<IconTemplate uri={item.icon_uri} altText={item.name} />
			{item.source}
		</div>
	);

	return (
		<Card className="p-m-2" header={header}>
			{body}
		</Card>
	);
};
