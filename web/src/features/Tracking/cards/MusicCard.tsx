import React, { FunctionComponent } from 'react';
import { Music } from 'features/Tracking/trackingTypes';
import { IconTemplate } from '../common/IconTemplate';

type props = {
	item: Music;
};

export const MusicCard: FunctionComponent<props> = ({ item }) => {
	return (
		<div className="container--card-content reaction p-d-flex p-flex-column p-ai-center">
			<IconTemplate uri={item.image_uri} altText={item.name} />
			<div className="p-text-bold p-text-center p-mt-4">
				{item.source.replace(
					'; Nook Shopping Daily Selection',
					', Nook Shopping'
				)}
			</div>
			<div className="p-text-center">{item.source_notes}</div>
		</div>
	);
};
