import React, { FunctionComponent } from 'react';
import { Fish } from 'features/Tracking/trackingTypes';
import { useAppSelector } from 'app/hooks';
import { selectAccountHemisphere } from 'features/Common/commonSlice';
import {
	bellsSellText,
	hemispheres,
	shadowSizeText,
	sourceText,
} from 'utils/constants';
import { IconTemplate } from '../common/IconTemplate';

type props = {
	item: Fish;
};

export const FishCard: FunctionComponent<props> = ({ item }) => {
	const hemisphere = useAppSelector(selectAccountHemisphere);

	const months =
		hemisphere === hemispheres.SOUTHERN
			? item.southernMonths
			: item.northernMonths;

	return (
		<div className="container--card-content fish ">
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
				<div>{sourceText}</div>
				<div>{item.source}</div>
			</div>
			<div className="container--card-info">
				<div>{shadowSizeText}</div>
				<div>{item.shadow_size}</div>
			</div>
			<div className="container--card-info">
				<div>{bellsSellText}</div>
				<div>{item.bells_sell}</div>
			</div>
		</div>
	);
};
