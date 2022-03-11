import React from 'react';
import { useAppSelector } from '../../app/hooks';

import { selectAuthIsLoggedIn, selectAuthLoading } from '../Common/commonSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Common/common.scss';
import {
	landingPageExistingUserText,
	landingPageNewUserText,
} from 'utils/constants';
import AuthButtons from './Auth/AuthButtons';
import { ExistingUserLandingPage } from './ExistingUserLandingPage';

export function LandingPage() {
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const loading = useAppSelector(selectAuthLoading);

	let content = (
		<div className="p-d-flex p-flex-column p-ai-center p-pb-4">
			<p className="title">{landingPageNewUserText}</p>
		</div>
	);

	if (loading) {
		content = <LoadingIcon fullScreen={false} />;
	}

	content = <ExistingUserLandingPage />;

	return (
		<div className="container--landing-page p-d-flex p-jc-center p-ai-center p-mb-6">
			<div
				className={`content p-mt-6 p-d-flex p-ai-center p-jc-center
				`}
			>
				{content}
			</div>
		</div>
	);
}
