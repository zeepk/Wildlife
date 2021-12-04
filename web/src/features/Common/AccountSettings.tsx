import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {
	selectAuthIsLoggedIn,
	selectAuthLoading,
	selectAccountUsername,
	selectAccountAvatar,
	selectAccountAvatarId,
} from '../Common/commonSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import {
	accountSettingsAvatarUriText,
	accountSettingsTitleText,
	accountSettingsUsernameText,
	errorMessageAccountSettingsNotLoggedIn,
} from 'utils/constants';
import 'features/Common/common.scss';
import AvatarDropdown from './Auth/AvatarDropdown';
import { Villager } from './commonTypes';

export function AccountSettings() {
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const loading = useAppSelector(selectAuthLoading);
	const existingUsername = useAppSelector(selectAccountUsername);
	const existingAvatar = useAppSelector(selectAccountAvatar);
	const existingAvatarId = useAppSelector(selectAccountAvatarId);

	const [avatarUri, setAvatarUri] = useState(existingAvatar);
	const [avatarId, setAvatarId] = useState(existingAvatarId);
	const [username, setUsername] = useState(existingUsername);

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	if (!isLoggedIn) {
		return <h1 className="title">{errorMessageAccountSettingsNotLoggedIn}</h1>;
	}

	const updateAvatar = (villager: Villager) => {
		setAvatarUri(villager.image_uri);
		setAvatarId(villager.euid);
	};

	return (
		<div className="container--account-settings p-d-flex p-jc-center p-align-center">
			<div className="container--settings p-mt-6 p-px-4">
				<h1 className="title">{accountSettingsTitleText}</h1>
				<div className="setting">
					<h3>{accountSettingsUsernameText}</h3>
					<InputText
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="setting">
					<h3>{accountSettingsAvatarUriText}</h3>
					<AvatarDropdown callback={updateAvatar} selectedId={avatarId} />
				</div>
				<div className="setting">
					<div />
					<Button className="button--avatar account-settings p-button-rounded p-button-success">
						<img src={avatarUri} alt="avatar" />
					</Button>
				</div>
				<div className="end p-mt-6 p-mb-4 p-d-flex p-jc-center p-ai-center">
					<Button className="p-button-info p-mr-2" label="Save" />
					<Button className="p-button-danger p-ml-2" label="Discard" />
				</div>
			</div>
		</div>
	);
}
