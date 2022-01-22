import React from 'react';
import 'features/Common/common.scss';
import { friendsTitleText } from 'utils/constants';
import { useAppSelector } from 'app/hooks';
import { selectAccountFriends } from '../commonSlice';

export function FriendsList() {
	const friends = useAppSelector(selectAccountFriends);
	const friendsContent = friends.map((f) => (
		<div
			key={f._id}
			className="container--profile p-d-flex p-ai-center p-jc-between p-p-2 p-mb-2"
		>
			<div className="p-d-flex p-ai-center p-jc-start">
				<img src={f.avatar} alt={f.username} />
				<div className="username p-ml-1">{f.username}</div>
			</div>
			<div />
		</div>
	));

	return (
		<div className="container--friends-list p-d-flex p-flex-column p-jc-start p-px-4 p-pb-2">
			<h1 className="title p-p-0 p-my-0">{friendsTitleText}</h1>
			{friendsContent}
		</div>
	);
}
