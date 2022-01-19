import React, { useState, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import {
	addFriendAlreadyFriendsText,
	addFriendIsMeText,
	addFriendRequestSentText,
	addFriendSearchButtonText,
	addFriendSearchPlaceholderText,
	addFriendSendRequestText,
	addFriendTitleText,
	errorMessageNoUserFound,
	maxUsernameLength,
} from 'utils/constants';
import 'features/Common/common.scss';
import { useAppDispatch } from 'app/hooks';
import { searchForUser, sendUserFriendRequest } from '../commonSlice';
import { Profile } from '../commonTypes';
import LoadingIcon from '../LoadingIcon';
import { isNullUndefinedOrWhitespace } from 'utils/helperFunctions';

export function AddFriend() {
	const dispatch = useAppDispatch();
	const toast = useRef<Toast>(null);
	const [username, setUsername] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
	// const [existingIncoming, setExistingIncoming] = useState<string | null>('');
	const [existingOutgoing, setExistingOutgoing] = useState<string | null>('');
	const [isMe, setIsMe] = useState(false);
	const [alreadyFriends, setAlreadyFriends] = useState(false);
	const showNotFoundMessage = profile === null;

	const handleSearch = async (e?: any) => {
		if (e) {
			e.preventDefault();
		}
		setLoading(true);
		const resp: any = await dispatch(searchForUser(username));
		if (resp.error || !resp.payload.data.success) {
			setProfile(null);
			setSearchTerm(username);
		} else {
			const data = resp.payload.data.data;
			setProfile(data.profile);
			// setExistingIncoming(data.existingIncoming);
			setExistingOutgoing(data.existingOutgoing);
			setIsMe(data.isMe);
			setAlreadyFriends(data.alreadyFriends);
		}
		setLoading(false);
	};

	const handleSendFriendRequest = async () => {
		setButtonLoading(true);
		const resp: any = await dispatch(sendUserFriendRequest(username));
		if (resp.error || !resp.payload.data.success) {
			setProfile(null);
		} else {
			const data = resp.payload.data.data;
			setExistingOutgoing(data._id);
		}
		setButtonLoading(false);
	};

	let profileContent = <div />;
	if (loading) {
		profileContent = <LoadingIcon fullScreen={false} />;
	}
	if (showNotFoundMessage) {
		profileContent = <div>{`${errorMessageNoUserFound} ${searchTerm}`}</div>;
	}
	if (profile) {
		const friendRequestSent = !isNullUndefinedOrWhitespace(existingOutgoing);
		const buttonDisabled = friendRequestSent || alreadyFriends || isMe;

		let buttonColor = 'primary';
		let buttonText = addFriendSendRequestText;
		if (alreadyFriends) {
			buttonColor = 'success';
			buttonText = addFriendAlreadyFriendsText;
		} else if (friendRequestSent) {
			buttonColor = 'help';
			buttonText = addFriendRequestSentText;
		} else if (isMe) {
			buttonColor = 'secondary';
			buttonText = addFriendIsMeText;
		}

		profileContent = (
			<div className="container--profile p-d-flex p-ai-center p-jc-between p-p-2">
				<div className="p-d-flex p-ai-center p-jc-start">
					<img src={profile.avatar} alt={profile.username} />
					<div className="username p-ml-1">{profile.username}</div>
				</div>
				{buttonLoading ? (
					<LoadingIcon fullScreen={false} />
				) : (
					<Button
						label={buttonText}
						className={`p-button-${buttonColor}`}
						onClick={() => handleSendFriendRequest()}
						disabled={buttonDisabled}
					/>
				)}
			</div>
		);
	}

	return (
		<div className="container--add-friend p-d-flex p-jc-center">
			<Toast ref={toast} />
			<div className="container--add p-px-4">
				<h1 className="title p-p-0 p-my-0">{addFriendTitleText}</h1>
				<form className="p-d-flex p-mb-2" onSubmit={(e) => handleSearch(e)}>
					<InputText
						className="p-mr-2"
						value={username}
						placeholder={addFriendSearchPlaceholderText}
						onChange={(e) =>
							e.target.value.length <= maxUsernameLength &&
							setUsername(e.target.value)
						}
					/>
					<Button
						label={addFriendSearchButtonText}
						onClick={() => handleSearch()}
					/>
				</form>
				{profileContent}
			</div>
		</div>
	);
}
