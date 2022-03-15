import LoadingIcon from 'features/Common/LoadingIcon';
import React, { FunctionComponent, useState } from 'react';
import { errorMessageNoArtFound } from 'utils/constants';

type props = {
	realUri: string;
	fakeUri: string;
	alt: string;
};

export const FakeArtModalContent: FunctionComponent<props> = ({
	realUri,
	fakeUri,
	alt,
}) => {
	const [loading, setLoading] = useState(2);
	const [error, setError] = useState(false);
	const isLoading = loading > 0;

	const decrementLoading = () => setLoading(Math.min(loading - 1, 0));

	const handleError = () => {
		setLoading(0);
		setError(true);
	};
	return (
		<div className="container--art-modal fake p-d-flex p-ai-center p-flex-column">
			<div>
				{isLoading && <LoadingIcon fullScreen={false} />}
				{error && <div>{errorMessageNoArtFound}</div>}
			</div>
			<div
				className={`comparison p-d-flex p-ai-center p-jc-evenly p-flex-md-row p-flex-column ${
					isLoading && 'hidden'
				}`}
			>
				<div className="p-d-flex p-flex-column p-ai-center art">
					<h1>Real</h1>
					<img
						src={realUri}
						alt={alt}
						onError={() => handleError()}
						onLoad={() => decrementLoading()}
					/>
				</div>
				<div className="spacer" />
				<div className="p-d-flex p-flex-column p-ai-center art">
					<h1>Fake</h1>
					<img
						src={fakeUri}
						alt={alt}
						onError={() => handleError()}
						onLoad={() => decrementLoading()}
					/>
				</div>
			</div>
			<div className="link p-mt-4">
				Still not sure? Check out{' '}
				<a href="https://www.polygon.com/animal-crossing-new-horizons-switch-acnh-guide/2020/4/23/21231433">
					{'this article'}
				</a>{' '}
				for a more in-depth comparison.
			</div>
		</div>
	);
};
