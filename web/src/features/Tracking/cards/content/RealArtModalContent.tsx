import LoadingIcon from 'features/Common/LoadingIcon';
import React, { FunctionComponent, useState } from 'react';
import { errorMessageNoArtFound } from 'utils/constants';

type props = {
	uri: string;
	alt: string;
};

export const RealArtModalContent: FunctionComponent<props> = ({ uri, alt }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const handleError = () => {
		setLoading(false);
		setError(true);
	};

	return (
		<div className="container--art-modal">
			{loading && <LoadingIcon fullScreen={false} />}
			{error && <div>{errorMessageNoArtFound}</div>}
			<img
				src={uri}
				alt={alt}
				onLoad={() => setLoading(false)}
				onError={() => handleError()}
			/>
		</div>
	);
};
