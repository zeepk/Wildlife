import React, { useState, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';

import {
	selectAuthIsLoggedIn,
	selectAuthLoading,
	selectAccountUsername,
	selectAccountAvatar,
	selectAccountAvatarId,
	selectAccountHemisphere,
	selectAuthId,
	updateUserProfile,
	selectAccountVillagers,
	selectVillagers,
} from 'features/Common/commonSlice';
import LoadingIcon from 'features/Common/LoadingIcon';
import {
	accountSettingsAvatarUriText,
	accountSettingsHemisphereText,
	accountSettingsImportDataText,
	accountSettingsTitleText,
	accountSettingsUsernameText,
	accountSettingsVillagersTitleText,
	errorMessageAccountSettingsCannotUpdate,
	errorMessageAccountSettingsNotLoggedIn,
	errorMessageUsernameInvalidLength,
	errorMessageVillagerExists,
	globalToastLifetime,
	hemispheres,
	profileSettingsTitleText,
	successMessageAccountSettingsUpdated,
} from 'utils/constants';
import 'features/Common/common.scss';
import AvatarDropdown from './Auth/AvatarDropdown';
import { AuthDataUpdateProfile, Villager } from './commonTypes';
import {
	isNullUndefinedOrWhitespace,
	usernameValid,
} from 'utils/helperFunctions';
import HemisphereDropdown from './Auth/HemisphereDropdown';
import ImportData from './ImportData';

export function AccountSettings() {
	const toast = useRef<Toast>(null);
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
	const loading = useAppSelector(selectAuthLoading);
	const existingUsername = useAppSelector(selectAccountUsername);
	const existingAvatar = useAppSelector(selectAccountAvatar);
	const existingAvatarId = useAppSelector(selectAccountAvatarId);
	const existingVillagerIds = useAppSelector(selectAccountVillagers);
	const authId = useAppSelector(selectAuthId);
	const existingHemisphere = useAppSelector(selectAccountHemisphere);

	const [avatarUri, setAvatarUri] = useState(existingAvatar);
	const [avatarId, setAvatarId] = useState(existingAvatarId);
	const [hemisphere, setHemisphere] = useState(existingHemisphere);
	const [username, setUsername] = useState(existingUsername);
	const [currentVillagerIds, setCurrentVillagerIds] =
		useState(existingVillagerIds);
	const [profileLoading, setProfileLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	if (loading) {
		return <LoadingIcon fullScreen={true} />;
	}

	if (!isLoggedIn) {
		return <h1 className="title">{errorMessageAccountSettingsNotLoggedIn}</h1>;
	}

	const updateUsername = (value: string) => {
		setUsername(value);
		if (!usernameValid(value)) {
			setErrorMessage(errorMessageUsernameInvalidLength);
		} else {
			setErrorMessage('');
		}
	};

	const updateAvatar = (villager: Villager) => {
		setAvatarUri(villager.image_uri);
		setAvatarId(villager.ueid);
	};

	const updateCurrentVillager = (villager: Villager, index: number) => {
		if (!currentVillagerIds) {
			return;
		}
		const currentVillagerArray = [...currentVillagerIds];
		if (currentVillagerArray.includes(villager.ueid)) {
			toast?.current?.show({
				severity: 'warn',
				detail: `${villager.name} ${errorMessageVillagerExists}`,
				life: globalToastLifetime,
			});
			return;
		}
		currentVillagerArray[index] = villager.ueid;
		setCurrentVillagerIds(currentVillagerArray);
	};

	const updateHemisphere = (value: number) => {
		setHemisphere(value as hemispheres);
	};

	const sendToastMessage = (severity: 'error' | 'success', message: string) =>
		toast?.current?.show({
			severity,
			detail: message,
			life: globalToastLifetime,
		});

	// const isProfileValid = () =>
	// 	username !== undefined &&
	// 	usernameValid(username) &&
	// 	avatarId !== undefined &&
	// 	authId !== undefined &&
	// 	existingHemisphere !== undefined;

	const updateProfile = () => {
		setProfileLoading(true);
		if (
			username === undefined ||
			!usernameValid(username) ||
			avatarId === undefined ||
			authId === undefined ||
			hemisphere === undefined
		) {
			console.error(
				'Unable to update profile, the existing profile may be invalid',
			);
			return;
		}
		const req: AuthDataUpdateProfile = {
			username,
			authId,
			avatarId,
			hemisphere,
			villagers: currentVillagerIds,
		};

		dispatch(updateUserProfile(req)).then((resp: any) => {
			if (resp.error) {
				toast?.current?.show({
					severity: 'error',
					detail: errorMessageAccountSettingsCannotUpdate,
					life: globalToastLifetime,
				});
			} else if (
				resp.payload.data.success === false &&
				!isNullUndefinedOrWhitespace(resp.payload.data.errorMessage)
			) {
				toast?.current?.show({
					severity: 'error',
					detail: resp.payload.data.errorMessage,
					life: globalToastLifetime,
				});
			} else {
				toast?.current?.show({
					severity: 'success',
					detail: successMessageAccountSettingsUpdated,
					life: globalToastLifetime,
				});
			}
			setProfileLoading(false);
		});
	};

	const villagerSelectionContent = currentVillagerIds?.map((cv, i) => (
		<div key={i} className="p-p-2">
			<AvatarDropdown
				callback={updateCurrentVillager}
				selectedId={cv}
				index={i}
			/>
		</div>
	));

	return (
		<div className="container--account-settings p-d-flex p-jc-center p-align-center p-mb-6">
			<Toast ref={toast} />
			<div className="container--settings p-mt-6 p-px-4">
				<h1 className="title">{profileSettingsTitleText}</h1>
				<div className="setting p-d-flex p-ai-start">
					<h3>{accountSettingsUsernameText}</h3>
					<InputText
						value={username}
						onChange={(e) => updateUsername(e.target.value)}
					/>
				</div>
				<div
					className={`container--error p-d-flex p-jc-end ${
						isNullUndefinedOrWhitespace(errorMessage) && 'hidden'
					}`}
				>
					<p className="text--error p-mb-4 p-mt-0 p-px-2">{errorMessage}</p>
				</div>
				<div className="setting">
					<h3>{accountSettingsAvatarUriText}</h3>
					<AvatarDropdown callback={updateAvatar} selectedId={avatarId} />
				</div>
				<div className="setting p-mb-6">
					<div />
					<Button className="button--avatar account-settings p-button-rounded p-button-success">
						<img src={avatarUri} alt="avatar" />
					</Button>
				</div>
				<h1 className="title">{accountSettingsVillagersTitleText}</h1>
				<div className="container--villagers p-d-flex p-flex-wrap p-ai-center p-jc-center">
					{villagerSelectionContent}
				</div>
				<h1 className="title">{accountSettingsTitleText}</h1>
				<div className="setting p-mb-6">
					<h3>{accountSettingsHemisphereText}</h3>
					<HemisphereDropdown
						callback={updateHemisphere}
						selectedHemisphereId={Number(hemisphere)}
					/>
				</div>
				<div className="setting import">
					<h3>{accountSettingsImportDataText}</h3>
					<div>
						<ImportData callback={sendToastMessage} />
					</div>
				</div>
				<div className="end p-mt-6 p-mb-4 p-d-flex p-jc-center p-ai-center">
					{profileLoading ? (
						<ProgressBar
							mode="indeterminate"
							className="loading--profile p-mr-2"
						/>
					) : (
						<Button
							className="p-button-info p-mr-2"
							label="Save"
							onClick={() => updateProfile()}
							disabled={!usernameValid(username)}
						/>
					)}
					<Button className="p-button-danger p-ml-2" label="Discard" disabled />
				</div>
			</div>
		</div>
	);
}
