import React, { FunctionComponent } from 'react';
import { Reaction } from 'features/Tracking/trackingTypes';
import { IconTemplate } from '../common/IconTemplate';
import { isNullUndefinedOrWhitespace } from 'utils/helperFunctions';

type props = {
	item: Reaction;
};

export const ReactionCard: FunctionComponent<props> = ({ item }) => {
	const notesText = isNullUndefinedOrWhitespace(item.event)
		? item.source_notes
		: item.event;
	return (
		<div className="container--card-content reaction p-d-flex p-flex-column p-ai-center">
			<IconTemplate uri={item.image_uri} altText={item.name} />
			<div className="p-text-bold p-text-center">{item.source}</div>
			<div className="p-text-center">{notesText}</div>
		</div>
	);
};
