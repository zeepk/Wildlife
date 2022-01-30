import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
	getUserProfile,
	createUserProfile,
	selectAuthIsLoggedIn,
	selectAuthLoading,
	selectAccountExists,
	getUserFriendRequests,
	searchForUser,
} from 'features/Common/commonSlice';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { LoginButton } from 'features/Common/Auth/LoginButton';
import { AccountIcon } from 'features/Common/Auth/AccountIcon';
import {
	isNullUndefinedOrWhitespace,
	usernameValid,
} from 'utils/helperFunctions';
import {
	errorMessageUsernameInvalidLength,
	maxUsernameLength,
	minUsernameLength,
} from 'utils/constants';
import 'features/Common/common.scss';
import { Villager } from '../commonTypes';
import AvatarDropdown from './AvatarDropdown';

export function AuthButtons() {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const profileExists = useAppSelector(selectAccountExists);
	const isLoading = useAppSelector(selectAuthLoading);
	const [username, setUsername] = useState('');
	const [avatarUri, setAvatarUri] = useState('');
	const [avatarId, setAvatarId] = useState('');
	const [tempAuthId, setTempAuthId] = useState('');

	const [errorMessage, setErrorMessage] = useState('');
	const [usernameModalOpen, setUsernameModalOpen] = useState(false);

	const formValid = () =>
		usernameValid(username) &&
		!isNullUndefinedOrWhitespace(avatarUri) &&
		!isNullUndefinedOrWhitespace(avatarId);

	const updateUsername = (value: string) => {
		setUsername(value);
		if (value.length < minUsernameLength || value.length > maxUsernameLength) {
			setErrorMessage(errorMessageUsernameInvalidLength);
		} else {
			setErrorMessage('');
		}
	};

	const createAccount = async () => {
		const resp: any = await dispatch(searchForUser(username));
		if (resp.error || !resp.payload.data.success) {
			setErrorMessage(errorMessageUsernameInvalidLength);
		}
		setUsernameModalOpen(false);
		const createPayload = {
			authId: tempAuthId,
			username: username,
			avatar: avatarUri,
			avatarId: avatarId,
		};
		dispatch(createUserProfile(createPayload));
	};

	const updateAvatar = (villager: Villager) => {
		setAvatarUri(villager.image_uri);
		setAvatarId(villager.ueid);
	};

	useEffect(() => {
		// if not logged in (refr or just hit page)
		//		checkIsAuth/Profile
		//		if no auth (not logged in, but could already have acct)
		//			return nothing, show the login button
		//		if auth but no prof (just arroved from creating auth0 acct)
		//			open create profile modal
		//		if auth and profile
		//			return profile
		if (!isLoggedIn) {
			dispatch(getUserProfile()).then((resp: any) => {
				const data = resp.payload.data.data;
				if (data.isLoggedIn && !data.profile) {
					setTempAuthId(data.tempAuthId);
					setUsernameModalOpen(true);
				} else {
					dispatch(getUserFriendRequests());
				}
			});
		}
	}, [dispatch, isLoggedIn]);

	if (isLoading) {
		return (
			<ProgressBar mode="indeterminate" className="loading--profile p-mr-2" />
		);
	}

	if (isLoggedIn) {
		return (
			<div>
				<Dialog
					className="modal--username"
					header="Set your username!"
					visible={usernameModalOpen}
					closeOnEscape={false}
					closable={false}
					onHide={() => setUsernameModalOpen(false)}
				>
					<div className="container--modal-username p-d-flex p-flex-column p-ai-center">
						<InputText
							value={username}
							onChange={(e) => updateUsername(e.target.value)}
						/>
						<p className="text--error p-mb-2">{errorMessage}</p>
						<AvatarDropdown callback={updateAvatar} selectedId={avatarId} />
						<Button
							className="p-button-info p-mt-6"
							label={formValid() ? 'Looks good!' : 'hmmm...'}
							disabled={!formValid()}
							onClick={() => createAccount()}
						/>
					</div>
				</Dialog>

				{profileExists && <AccountIcon />}
			</div>
		);
	}

	return (
		<div className="container--auth">
			<LoginButton />
		</div>
	);
}
