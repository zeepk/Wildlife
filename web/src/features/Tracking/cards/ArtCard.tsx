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
import { RealArtModalContent } from './content/RealArtModalContent';
import { FakeArtModalContent } from './content/FakeArtModalContent';

type props = {
	item: Art;
};

export const ArtCard: FunctionComponent<props> = ({ item }) => {
	const [visible, setVisible] = useState(false);
	const [modalContent, setModalContent] = useState(<h1>unset</h1>);

	const realArtModalContent = (
		<RealArtModalContent uri={item.image_uri} alt={item.name} />
	);

	const fakeArtModalContent = (
		<FakeArtModalContent
			realUri={item.image_uri || item.icon_uri}
			fakeUri={item.fake_uri}
			alt={item.name}
		/>
	);

	const openArtworkModal = (isFake: boolean) => {
		setModalContent(isFake ? fakeArtModalContent : realArtModalContent);
		setVisible(true);
	};

	return (
		<div className="container--card-content">
			<Dialog
				className="modal--art"
				visible={visible}
				onHide={() => setVisible(false)}
				header={item.name}
				dismissableMask
			>
				{modalContent}
			</Dialog>

			<div className="p-d-flex p-flex-column p-ai-center p-jc-between p-px-2">
				<IconTemplate uri={item.icon_uri} altText={item.name} />
				<Button
					className="p-button-success p-mt-4"
					label={artViewButtonText}
					onClick={() => openArtworkModal(false)}
				/>
			</div>
			<div className="p-d-flex p-ai-center p-jc-center p-mt-4">
				{isNullUndefinedOrWhitespace(item.fake_uri) ? (
					<div className="p-mt-3">{artAlwaysRealText}</div>
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
