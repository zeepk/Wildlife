import React, { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import { getUserProfile, createUserProfile } from 'features/Common/commonSlice';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { LoginButton } from 'features/Common/Auth/LoginButton';
import { AccountIcon } from 'features/Common/Auth/AccountIcon';
import { usernameValid } from 'utils/helperFunctions';
import { maxUsernameLength, minUsernameLength } from 'utils/constants';
import 'features/Common/common.scss';

export function AuthButtons() {
	const dispatch = useAppDispatch();
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [username, setUsername] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [usernameModalOpen, setUsernameModalOpen] = useState(false);

	const updateUsername = (value: string) => {
		setUsername(value);
		if (value.length < minUsernameLength || value.length > maxUsernameLength) {
			setErrorMessage("Let's keep it between 4 and 12 characters");
		} else {
			setErrorMessage('');
		}
	};

	const createAccount = () => {
		setUsernameModalOpen(false);
		if (!user || !user.sub || !user.picture) {
			console.error('unable to create profile');
			return;
		}
		const createPayload = {
			authId: user.sub,
			username: username,
			avatar: user.picture,
		};
		dispatch(createUserProfile(createPayload));
	};

	useEffect(() => {
		if (isAuthenticated && user?.sub) {
			dispatch(getUserProfile(user.sub)).then((resp: any) => {
				if (resp.error && user.sub && user.name && user.picture) {
					setUsernameModalOpen(true);
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
						<p>{errorMessage}</p>
						<Button
							className="p-button-info p-mr-2"
							label={usernameValid(username) ? 'Looks good!' : 'hmmm...'}
							disabled={!usernameValid(username)}
							onClick={() => createAccount()}
						/>
					</div>
				</Dialog>

				<AccountIcon />
			</div>
		);
	}

	return (
		<div className="container--auth">
			<LoginButton />
		</div>
	);
}
