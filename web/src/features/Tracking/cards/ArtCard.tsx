import React, { FunctionComponent, useState } from 'react';
import { Art } from 'features/Tracking/trackingTypes';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import {
	artAlwaysRealText,
	artFakeComparisonButtonText,
	artViewButtonText,
} from 'utils/constants';
import { IconTemplate } from '../common/IconTemplate';
import { isNullUndefinedOrWhitespace } from 'utils/helperFunctions';

type props = {
	item: Art;
};

export const ArtCard: FunctionComponent<props> = ({ item }) => {
	const [visible, setVisible] = useState(false);
	const [modalContent, setModalContent] = useState(<h1>unset</h1>);

	const openArtworkModal = (isFake: boolean) => {
		setModalContent(<h1>{isFake ? 'fake' : 'real'} artwork</h1>);
		setVisible(true);
	};

	return (
		<div className="container--card-content">
			<Dialog visible={visible} onHide={() => setVisible(false)}>
				{modalContent}
			</Dialog>

			<div className="p-d-flex p-flex-row p-ai-center p-jc-between p-px-2">
				<IconTemplate uri={item.icon_uri} altText={item.name} />
				<Button
					className="p-button-success"
					label={artViewButtonText}
					onClick={() => openArtworkModal(false)}
				/>
			</div>
			<div className="p-d-flex p-ai-center p-jc-center p-mt-6">
				{isNullUndefinedOrWhitespace(item.fake_uri) ? (
					<div>{artAlwaysRealText}</div>
				) : (
					<Button
						className="p-button-info"
						label={artFakeComparisonButtonText}
						onClick={() => openArtworkModal(true)}
					/>
				)}
			</div>
		</div>
	);
};
