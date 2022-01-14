import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import {
	addFriendSearchButtonText,
	addFriendSearchPlaceholderText,
	addFriendTitleText,
	errorMessageNoUserFound,
} from 'utils/constants';
import 'features/Common/common.scss';
import { useAppDispatch } from 'app/hooks';
import { searchForUser } from '../commonSlice';
import { Profile } from '../commonTypes';
import LoadingIcon from '../LoadingIcon';

export function AddFriend() {
	const dispatch = useAppDispatch();
	const toast = useRef<Toast>(null);
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);
	const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
	const showNotFoundMessage = profile === null;

	const handleSearch = async () => {
		setLoading(true);
		const resp: any = await dispatch(searchForUser(username));
		if (resp.error || !resp.payload.data.success) {
			setProfile(null);
		} else {
			setProfile(resp.payload.data.data.profile);
		}
		setLoading(false);
	};

	let profileContent = <div />;
	if (loading) {
		profileContent = <LoadingIcon fullScreen={false} />;
	}
	if (showNotFoundMessage) {
		profileContent = <div>{errorMessageNoUserFound}</div>;
	}
	if (profile) {
		profileContent = (
			<div className="container--profile p-d-flex p-ai-center p-jc-between p-p-2">
				<div className="p-d-flex p-ai-center p-jc-start">
					<img src={profile.avatar} alt={profile.username} />
					<div className="username p-ml-1">{profile.username}</div>
				</div>
				<Button
					label={addFriendSearchButtonText}
					onClick={() => handleSearch()}
				/>
			</div>
		);
	}

	return (
		<div className="container--add-friend p-d-flex p-jc-center">
			<Toast ref={toast} />
			<div className="container--add p-px-4">
				<h1 className="title p-p-0 p-my-0">{addFriendTitleText}</h1>
				<div className="p-d-flex">
					<InputText
						className="p-mr-2"
						value={username}
						placeholder={addFriendSearchPlaceholderText}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<Button
						label={addFriendSearchButtonText}
						onClick={() => handleSearch()}
					/>
				</div>
				{profileContent}
			</div>
		</div>
	);
}
