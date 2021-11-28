import React from 'react';
import { useAppSelector } from '../../app/hooks';

import { selectAuthIsLoggedIn, selectAuthLoading } from '../Common/commonSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import 'features/Common/common.scss';

export function LandingPage() {
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const loading = useAppSelector(selectAuthLoading);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	if (isLoggedIn) {
		return <h1 className="title">Logged In!</h1>;
	}

	return <h1 className="title">Welcome, new user!</h1>;
}
