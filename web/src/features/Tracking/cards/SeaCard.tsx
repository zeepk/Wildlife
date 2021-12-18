import React, { FunctionComponent } from 'react';
import { Sea } from 'features/Tracking/trackingTypes';
import { useAppSelector } from 'app/hooks';
import { selectAccountHemisphere } from 'features/Common/commonSlice';
import {
	bellsSellText,
	hemispheres,
	rarityText,
	speedText,
} from 'utils/constants';
import { IconTemplate } from '../common/IconTemplate';
import { calculateRarity } from 'utils/helperFunctions';

type props = {
	item: Sea;
};

export const SeaCard: FunctionComponent<props> = ({ item }) => {
	const hemisphere = useAppSelector(selectAccountHemisphere);

	const months =
		hemisphere === hemispheres.SOUTHERN
			? item.southernMonths
			: item.northernMonths;

	return (
		<div className="container--card-content sea">
			<div className="p-d-flex p-flex-row p-ai-center">
				<IconTemplate uri={item.icon_uri} altText={item.name} />
				<div className="container--card-info top p-ml-3">
					<i className="pi pi-clock" />
					<div>
						{item.time}
						<br />
						{months}
					</div>
				</div>
			</div>
			<div className="container--card-info">
				<div>{speedText}</div>
				<div>{item.speed}</div>
			</div>
			<div className="container--card-info">
				<div>{rarityText}</div>
				<div>{calculateRarity(item.spawn_rates)}</div>
			</div>
			<div className="container--card-info">
				<div>{bellsSellText}</div>
				<div>{item.bells_sell}</div>
			</div>
		</div>
	);
};
