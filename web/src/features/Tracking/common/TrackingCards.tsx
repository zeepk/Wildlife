import React, { FunctionComponent, useState } from 'react';
import { InputText } from 'primereact/inputtext';

import { Bug, Fish } from 'features/Tracking/trackingTypes';
import { TrackingCard } from './TrackingCard';

type props = {
	items: Array<Fish | Bug>;
	// this will end up also including | Bug | Sea | Fossil | etc.
};

export const TrackingCards: FunctionComponent<props> = ({ items }) => {
	const [searchText, setSearchText] = useState('');

	const fishCards = items
		.filter((i) =>
			i.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()),
		)
		.map((f) => <TrackingCard item={f} key={f._id} />);

	return (
		<div className="container--tracking-cards p-d-flex p-flex-column p-ai-center">
			<InputText
				value={searchText}
				placeholder="search..."
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<div className="container--cards">{fishCards}</div>
		</div>
	);
};
