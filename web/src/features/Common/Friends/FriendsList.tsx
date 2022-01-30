import React, { useState } from 'react';
import 'features/Common/common.scss';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {
	friendsTitleText,
	noneText,
	removeFriendModalButtonNoText,
	removeFriendModalButtonYesText,
	removeFriendModalHeader,
	removeFriendModalText,
} from 'utils/constants';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { removeUserFriend, selectAccountFriends } from '../commonSlice';

export function FriendsList() {
	const dispatch = useAppDispatch();
	const friends = useAppSelector(selectAccountFriends);
	const [modalOpen, setModalOpen] = useState(false);
	const [removeUsername, setRemoveUsername] = useState('');

	const handleRemoveFriend = (username: string) => {
		setRemoveUsername(username);
		setModalOpen(true);
	};

	const handleConfirmRemoveFriend = () => {
		dispatch(removeUserFriend(removeUsername));
		setModalOpen(false);
	};

	const friendsContent = friends.map((f) => (
		<div
			key={f.username}
			className="container--profile p-d-flex p-ai-center p-jc-between p-p-2 p-mb-2"
		>
			<div className="p-d-flex p-ai-center p-jc-start">
				<img src={f.avatar} alt={f.username} />
				<div className="username p-ml-1">{f.username}</div>
			</div>
			<Button
				icon="pi pi-times btn--remove-friend"
				className="p-button-rounded p-button-danger"
				onClick={() => handleRemoveFriend(f.username)}
			/>
		</div>
	));

	return (
		<div className="container--friends-list p-d-flex p-flex-column p-jc-start p-px-4 p-pb-2 p-mb-6">
			<Dialog
				className="modal--remove-friend"
				header={removeFriendModalHeader}
				visible={modalOpen}
				closeOnEscape={false}
				closable={false}
				onHide={() => setModalOpen(false)}
			>
				<div className="container--modal-username p-d-flex p-flex-column p-ai-center">
					<p className="text--are-you-sure p-mb-2">{`${removeFriendModalText} ${removeUsername}?`}</p>
					<div>
						<Button
							className="p-button-info p-mr-1"
							label={removeFriendModalButtonYesText}
							onClick={() => handleConfirmRemoveFriend()}
						/>
						<Button
							className="p-button-danger p-ml-1"
							label={removeFriendModalButtonNoText}
							onClick={() => setModalOpen(false)}
						/>
					</div>
				</div>
			</Dialog>

			<h1 className="title p-p-0 p-my-0">{friendsTitleText}</h1>
			{friendsContent}
			{friends.length === 0 && <p className="text--center">{noneText}</p>}
		</div>
	);
}
