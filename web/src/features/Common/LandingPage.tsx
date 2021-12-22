import React from 'react';
import { useAppSelector } from '../../app/hooks';

import { selectAuthIsLoggedIn, selectAuthLoading } from '../Common/commonSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Common/common.scss';
import {
	landingPageExistingUserText,
	landingPageNewUserText,
} from 'utils/constants';

export function LandingPage() {
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const loading = useAppSelector(selectAuthLoading);

	let content = <h1 className="title">{landingPageNewUserText}</h1>;

	if (loading) {
		content = <LoadingIcon fullScreen={false} />;
	}

	if (isLoggedIn) {
		content = <h1 className="title">{landingPageExistingUserText}</h1>;
	}

	return (
		<div className="container--landing-page p-d-flex p-jc-center p-ai-center">
			<div className="content p-mt-6 p-d-flex p-ai-center p-jc-center">
				{content}
			</div>
		</div>
	);
}
