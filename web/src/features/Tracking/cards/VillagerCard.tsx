import React, { FunctionComponent } from 'react';
import { Villager } from 'features/Common/commonTypes';
import { IconTemplate } from '../common/IconTemplate';
import { birthdayText, months, personalityText } from 'utils/constants';

type props = {
	item: Villager;
};

export const VillagerCard: FunctionComponent<props> = ({ item }) => {
	const monthIndex = Number(item.birthday.split('/')[0]);
	const monthInvalid = monthIndex > 12 || monthIndex < 1;

	const month = monthInvalid ? months[0] : months[monthIndex - 1];
	const dateString = `${month.name} ${item.birthday.split('/')[1]}`;
	return (
		<div className="container--card-content">
			<div className="p-d-flex p-flex-row p-ai-center p-jc-center p-mb-2">
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
				<div>{dateString}</div>
			</div>
		</div>
	);
};
