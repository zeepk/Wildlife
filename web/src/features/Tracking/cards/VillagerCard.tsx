import React, { FunctionComponent } from 'react';
import { Villager } from 'features/Common/commonTypes';
import { IconTemplate } from '../common/IconTemplate';
import { birthdayText, personalityText } from 'utils/constants';

type props = {
	item: Villager;
};

export const VillagerCard: FunctionComponent<props> = ({ item }) => {
	return (
		<div className="container--card-content">
			<div className="p-d-flex p-flex-row p-ai-center p-jc-around p-mb-2">
				<IconTemplate uri={item.icon_uri} altText={item.name} />
				<IconTemplate uri={item.image_uri} altText={item.name} />
			</div>
			<div className="container--card-info">
				<span
					className="iconify"
					data-icon={`el:${item.gender.toLowerCase()}`}
				></span>
				<div>{item.species}</div>
			</div>
			<div className="container--card-info">
				<div>{personalityText}</div>
				<div>{item.personality}</div>
			</div>
			<div className="container--card-info">
				<div>{birthdayText}</div>
				<div>{item.birthday}</div>
			</div>
		</div>
	);
};
