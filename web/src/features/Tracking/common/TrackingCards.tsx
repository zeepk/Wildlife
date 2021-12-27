import React, { FunctionComponent, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { motion } from 'framer-motion';

import {
	Achievement,
	Art,
	Bug,
	Fish,
	Fossil,
	Music,
	Reaction,
	Sea,
} from 'features/Tracking/trackingTypes';
import { TrackingCard } from './TrackingCard';
import { useAppSelector } from 'app/hooks';
import { selectAuthIsLoggedIn } from 'features/Common/commonSlice';
import { critterTypes } from 'utils/constants';

type props = {
	items: Array<
		Fish | Bug | Sea | Fossil | Music | Art | Reaction | Achievement
	>;
};

export const TrackingCards: FunctionComponent<props> = ({ items }) => {
	const [searchText, setSearchText] = useState('');
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

	const showCheckbox =
		isLoggedIn &&
		!items.some((i) => i.critter_type === critterTypes.ACHIEVEMENT);

	const fishCards = items
		.filter((i) =>
			i.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
		)
		.map((f) => (
			<TrackingCard item={f} showCheckbox={showCheckbox} key={f._id} />
		));

	const container = {
		hidden: { opacity: 0.5, y: -50 },
		show: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<div className="container--tracking-cards p-d-flex p-flex-column p-ai-center">
			<InputText
				value={searchText}
				placeholder="search..."
				onChange={(e) => setSearchText(e.target.value)}
			/>
			<motion.div variants={container} initial="hidden" animate="show">
				<div className="container--cards">{fishCards}</div>
			</motion.div>
		</div>
	);
};
