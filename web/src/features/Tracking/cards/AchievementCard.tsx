import React, { FunctionComponent } from 'react';
import { Achievement } from 'features/Tracking/trackingTypes';

type props = {
	item: Achievement;
};

export const AchievementCard: FunctionComponent<props> = ({ item }) => {
	return (
		<div className="container--card-content reaction p-d-flex p-flex-column p-ai-center">
			<div className="p-text-bold p-text-center">{item.tierCount}</div>
			<div className="p-text-center">{item.requirements}</div>
		</div>
	);
};
