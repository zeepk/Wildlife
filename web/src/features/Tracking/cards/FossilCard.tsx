import React, { FunctionComponent } from 'react';
import { Fossil } from 'features/Tracking/trackingTypes';
import { IconTemplate } from '../common/IconTemplate';
import { bellsSellText } from 'utils/constants';

type props = {
	item: Fossil;
};

export const FossilCard: FunctionComponent<props> = ({ item }) => {
	return (
		<div className="container--card-content fossil p-d-flex p-flex-column p-jc-between">
			<IconTemplate uri={item.image_uri} altText={item.name} />
			<div className="container--card-info">
				<div>{bellsSellText}</div>
				<div>{item.bells_sell}</div>
			</div>
		</div>
	);
};
