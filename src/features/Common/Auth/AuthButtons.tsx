import React, { useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserProfile, createUserProfile } from 'features/Common/commonSlice';
import { ProgressBar } from 'primereact/progressbar';

import { LoginButton } from 'features/Common/Auth/LoginButton';
import { AccountIcon } from 'features/Common/Auth/AccountIcon';
import 'features/Common/common.scss';

export function AuthButtons() {
	const dispatch = useAppDispatch();
	const { user, isAuthenticated, isLoading } = useAuth0();

	useEffect(() => {
		if (isAuthenticated && user?.sub) {
			dispatch(getUserProfile(user.sub)).then((resp: any) => {
				// console.log(user);
				if (resp.error && user.sub && user.name && user.picture) {
					const createPayload = {
						authId: user.sub,
						username: user.name,
						avatar: user.picture,
					};
					dispatch(createUserProfile(createPayload));
				}
			});
		}
	}, [isAuthenticated, dispatch, user?.sub, user?.name, user?.picture]);

	if (isLoading) {
		return (
			<ProgressBar mode="indeterminate" className="loading--profile p-mr-2" />
		);
	}

	if (isAuthenticated && user) {
		return <AccountIcon />;
	}

	return (
		<div className="container--auth">
			<LoginButton />
		</div>
	);
}
