import React, { FunctionComponent, useState } from 'react';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Tracking/tracking.scss';

type props = {
	username: string;
};

export const Tracking: FunctionComponent<props> = ({ username }) => {
	const [avatarLoading, updateAvatarLoading] = useState(true);

	const avatarSrc = 'sample uri';

	return (
		<div className="container--avatar">
			<img
				className="img--avatar"
				src={avatarSrc}
				alt={'player avatar'}
				onLoad={() => updateAvatarLoading(false)}
			/>
			{avatarLoading ? <LoadingIcon fullScreen={false} /> : <div />}
		</div>
	);
};
